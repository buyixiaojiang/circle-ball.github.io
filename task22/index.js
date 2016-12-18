/*
* html and css 参考了别人的
* 大体思路
* 实现前中后遍历，把遍历的结果放在一个数组中
* 对这个数组进行遍历，改变颜色
* */
var doc = document,
    btnPre = doc.getElementById('j-btn-preorder'),
    btnIn = doc.getElementById('j-btn-inorder'),
    btnPost = doc.getElementById('j-btn-postorder'),
    rootNode = doc.getElementById('j-tree-root'),
    treeArr = [];

function bindEvents() {
    btnPre.addEventListener('click', function () {
        treeArr = [];
        preOrder(rootNode);
        // console.log(treeArr);
        showProcess();
    }, false);
    btnIn.addEventListener('click', function () {
        treeArr = [];
        inOrder(rootNode);
        // console.log(treeArr);
        showProcess();
    }, false);
    btnPost.addEventListener('click', function () {
        treeArr = [];
        postOrder(rootNode);
        // console.log(treeArr);
        showProcess();
    }, false);
}

function preOrder(node) {
    if (node != null) {
        treeArr.push(node);
        preOrder(node.firstElementChild);
        preOrder(node.lastElementChild);
    }
}
function inOrder(node) {
    if (node != null) {
        inOrder(node.firstElementChild);
        treeArr.push(node);
        inOrder(node.lastElementChild);
    }
}
function postOrder(node) {
    if (node != null) {
        postOrder(node.firstElementChild);
        postOrder(node.lastElementChild);
        treeArr.push(node);
    }
}

function showProcess() {
    var length = treeArr.length;
    treeArr[0].classList.add('now');
    for (var i = 1; i < length; i++) {
        (function (i) {
            setTimeout(function () {
                treeArr[i - 1].classList.remove('now');
                treeArr[i].classList.add('now');
            }, 1000 * i);
        })(i);
    }
    setTimeout(function () {
        treeArr[length - 1].classList.remove('now');
    }, length * 1000)
}

function init() {
    bindEvents();
}
init();