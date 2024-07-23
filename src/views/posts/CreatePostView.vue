<script setup>
import { nodeToDom, domToNode } from "@/modules/editor"
import { onBeforeMount, onMounted, ref } from "vue";
import { createPostApi } from "@/services/post"
import Quill from 'quill';
import "/public/css/quill.snow.css";
import { authInfo } from "@/store/auth";
import { useRouter } from "vue-router";

onMounted(() => {
    mountQuill()
})

let editor;
const mountQuill = () => {
    const dataConfig = {
        placeholder: "Write something ...",
        theme: "snow",
        modules: {
            toolbar: {
                container: [
                    [{ 'header': 3 }, { 'header': 4 }],
                    ["bold", "italic"],
                    [{ list: "ordered" }, { list: "bullet" }],
                ],
            },
        },
    };
    editor = new Quill(editorCtnElm.value, dataConfig);
}

const editorCtnElm = ref("editorCtnElm")

const router = useRouter()

const title = ref("")
const author = ref(authInfo.value.author_name)
const savePost = async () => {
    const delta = editor.getContents();
    const contentsNode = convertFormat(delta.ops)
    try {
        await createPostApi(title.value, author.value, JSON.stringify(contentsNode), true).then(res => {
            console.log(res)

            router.push(`/posts/${res.path}`)
        })
    } catch (error) {
        console.log(error)
    }
}

function convertFormat(delta) {
    const node = [];
    let currentParagraph = { tag: "p", attrs: { dir: "auto" }, children: [] };

    for (const operation of delta) {
        const text = operation.insert || "";
        const isBold = operation.attributes && operation.attributes.bold;
        const isItalic = operation.attributes && operation.attributes.italic;

        // Handle newlines
        if (text.includes("\n")) {
            const lines = text.split("\n");
            console.log(lines)
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                
                if(i == 0 && node.length > 0){
                    currentParagraph.children.push(line);
                } else {
                    currentParagraph = { tag: "p", attrs: { dir: "auto" }, children: [] };
                    currentParagraph.children.push(line);
                    node.push(currentParagraph);
                }
            }
        } else {
        // Handle format
            if(isBold && isItalic) {
                currentParagraph.children.push({ tag: "strong", children: [
                    { tag: "em", children: [text] }
                ] });
                continue
            }

            if (isBold) {
                currentParagraph.children.push({ tag: "strong", children: [text] });
                continue
            } 

            if(isItalic) {
                currentParagraph.children.push({ tag: "em", children: [text] });
                continue
            }
            
            currentParagraph.children.push(text);
            currentParagraph = { tag: "p", attrs: { dir: "auto" }, children: [] };
        }

        
    }

    return node;
}
</script>

<template>
    <div>
        <h1>Create Post</h1>
        <div>
            <label for="">Title: </label>
            <input type="text" placeholder="Enter title" v-model="title">
        </div>
        <br>
        <div>
            <label for="">Author: </label>
            <input type="text" placeholder="Enter author" v-model="author" >
        </div>
        <br>
        <div class="editor-ctn-hover">
            <div class="editorCtn" id="editorCtnElm" ref="editorCtnElm">
            </div>
        </div>

        <button @click="savePost">Save</button>
    </div>
</template>

<style scoped>
.editor-ctn-hover {
    position: relative;
}

.editorCtn {
    height: 400px;
}
</style>