import { BinaryTreeNode, drawBinaryTree, VisualizationType, setTheme } from 'binary-tree-visualizer';
let opt = {
    textFont:20,
    strokeColor:'#3772de',
    colorArray: [{
        borderColor: '#0080ff',
        bgColor: "#fff"
    }]
};
setTheme(opt);
const insertBtn = document.querySelector("#insert");
insertBtn.addEventListener("click", ()=>{
    if(root.value==" "){
        root = new BinaryTreeNode(parseInt(document.getElementById("element").value));
        mainArr.push(parseInt(document.getElementById("element").value));
        draw();
    }
    else{
        let insertElement = parseInt(document.getElementById("element").value);
        let testElement = mainArr.find( number => number===insertElement);
        if(testElement!==insertElement){
            mainArr.push(insertElement);
            root = insertLevelOrder(mainArr,mainArr.length);
        }
        draw();
    }
})
let mainArr=[];
function insertLevelOrder(arr,N)
{   
    let nodeArr = [];
    if(N==0)
        nodeArr.push(new BinaryTreeNode(" "))
    for(let i=0;i<N;i++){
        nodeArr.push(new BinaryTreeNode(arr[i]));
    }
    for(let i=0;i<nodeArr.length;i++){
        let left=2*i+1;
        let right=2*i+2;
        if(left<nodeArr.length)
        nodeArr[i].setLeft(nodeArr[left]);
        if(right<nodeArr.length)
        nodeArr[i].setRight(nodeArr[right]);
    }
    return nodeArr[0];
}	
const heapifyBtn = document.getElementById("heapify");
heapifyBtn.addEventListener("click",()=>{
    buildHeap(mainArr);
    root = insertLevelOrder(mainArr,mainArr.length);
    draw();
})

function heapify(arr,i,n){
    let left=2*i+1,right=2*i+2,largest=i;
    if(left<n && arr[left]>arr[largest])
    largest=left;
    if(right<n && arr[right]>arr[largest])
    largest=right;

    if(largest!=i){
        let temp = arr[largest];
        arr[largest]=arr[i];
        arr[i]=temp;
        heapify(arr,largest,n);
    }
}

function buildHeap(arr){
     for(let i=Math.floor(arr.length/2)-1;i>=0;i--)
     heapify(arr,i,arr.length);
     
}


 const sortBtn = document.getElementById("sort");
 let steps = 0;
 sortBtn.addEventListener("click",()=>{
    steps = steps+1;
    sortBtn.innerText = "Step "+steps+"/"+(mainArr.length-1);
    root = insertLevelOrder(mainArr,mainArr.length-steps);
    draw();
    let temp = mainArr[mainArr.length-steps];
    mainArr[mainArr.length-steps]=mainArr[0];
    mainArr[0]=temp;
    heapify(mainArr,0,mainArr.length-steps);
    root = insertLevelOrder(mainArr,mainArr.length-steps);
    draw();
    if(steps==mainArr.length){
        sortBtn.innerText = "Finished";
        sortBtn.disabled = true;
        console.log("Sorted Array: ",mainArr);
        Array = [...mainArr];
        const element = document.getElementById("output_1");
        if(element!=undefined)
            element.remove();
        const output_1 = document.createElement("h2");
        output_1.setAttribute("id","output_1");
        let textnode = document.createTextNode("Sorted Array: [");
        output_1.appendChild(textnode); 
        textnode = document.createTextNode(Array);
        output_1.appendChild(textnode); 
        textnode = document.createTextNode("]");
        output_1.appendChild(textnode); 
        document.getElementById("output").appendChild(output_1);
    }
 })
function draw(){
    drawBinaryTree(root,document.querySelector("canvas"),{type:VisualizationType.HIGHLIGHT});
}
let root = new BinaryTreeNode(" ");
draw();