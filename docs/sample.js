


const delta = [
    {
      insert: "hello \nworld ",
    },
    {
      attributes: {
        bold: true,
      },
      insert: "ok ",
    },
    {
      insert: "vip\n haha\n",
    },
  ];



lines = [
  "hello", "world"
]

let currentParagraph = { tag: "p", attrs: { dir: "auto" }, children: ["world", { tag: "strong", children: ["vip"] }] };

const node = [
  { tag: "p", attrs: { dir: "auto" }, children: ["hello"] },
  { tag: "p", attrs: { dir: "auto" }, children: ["world", { tag: "strong", children: ["ok"] }, ] },

]

// const node = [
//   {
//     tag: "p",
//     attrs: { dir: "auto" },
//     children: ["Hello"],
//   },
//   {
//     tag: "p",
//     attrs: { dir: "auto" },
//     children: [
//       "World",
//       {
//         tag: "strong",
//         children: ["ok pro"],
//       },
//       " vip",
//     ],
//   },
// ];