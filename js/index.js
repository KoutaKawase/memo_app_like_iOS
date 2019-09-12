(() => {
    'use strict';

    let memoListArea = document.getElementById('memo-list');

    const createIndexElement = (key) => {
        let element = document.createElement('li');
        //子要素となるタイトルを生成
        let childElement = document.createElement('h3');
        element.className = 'index';
        //タイトルの中にメモ追加エリアへのアンカーを作成
        childElement.insertAdjacentHTML('afterbegin', `<a href="addMemo.html?key=${key}">${key}</a>`);
        //liの子要素にして返す
        element.appendChild(childElement);
        return element;
    }

    //localstorageからkeyをタイトルにした一覧を作成
    const printMemos = () => {
        for (let i = 0; i < localStorage.length; i++) {
            //全てのkeyを取得
            let key = localStorage.key(i);
            //タイトルをキー名にした要素を作成
            let element = createIndexElement(key);
            //ulの子要素として生成
            memoListArea.appendChild(element);
        }
    }

    window.onload = printMemos;
})();