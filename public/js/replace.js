'use strict';

//入力されたテキストをサニタイジング(エスケープ処理)する関数
function Sanitizing(text) {
    text = text
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n\n\n+/g, "<br \/><br \/>")
        .replace(/\n/g, "<br \/>");

    let after_text = text
    return after_text;
};


//---------------------------------------------------

//「画像のマークダウン記法」を「imgタグ」へ置換する処理をする関数
function MarkdownToImgReplace(text) {

    let input_width = Number(document.getElementById("input_width").value);

    text = text
        .replace(/\!\[.*?\]\((.*?)\)/g, `<img src="$1" width="${input_width}">`)

    return text;
};

//「画像のマークダウン記法」を「imgタグ」へ置換する関数
function MarkdownToImg() {

    //テキストエリア内のテキストを取得
    let text = document.getElementById("textarea").value;

    //使用に注意が必要な表現を着色する関数
    text = MarkdownToImgReplace(text);

    //入力されたテキストをサニタイジングする関数
    let after_text = Sanitizing(text);

    //表示ボックスに書き込む
    document.getElementById("box").innerHTML = after_text;
};

//---------------------------------------------------
//Wordpressのコードをマークダウン記法へ変換する処理をする関数
function ToMarkdownReplace(text) {

    // リンクをmarkdown用に編集
    text = text
        //英数字の全角括弧を半角括弧へ置換する。
        .replace(/<!-- .*code -->/g, '```')
        .replace(/<!--.*-->/g, '')

        .replace(/<h1>(.*)<\/h1>/g, '#$1')
        .replace(/<h2>(.*)<\/h2>/g, '##$1')
        .replace(/<h3>(.*)<\/h3>/g, '###$1')
        .replace(/<h4>(.*)<\/h4>/g, '####$1')
        .replace(/<h5>(.*)<\/h5>/g, '#####$1')
        .replace(/<h6>(.*)<\/h6>/g, '######$1')

        .replace(/<br>/g, '\n')

        .replace(/.class=\".*?\"/g, '')

        .replace(/\<a.*?href=\"(http.*?)\".*?\>(.*?)<\/a>/g, '\[$2\]\($1\)')
        .replace(/\<a href=\"(http.*?)\".*?\>(.*?)<\/a>/g, '\[$2\]\($1\)')

        .replace(/<figure>/g, '')
        .replace(/<\/figure>/g, '')

        .replace(/<span>/g, '')
        .replace(/<\/span>/g, '')

        .replace(/<strong>/g, '**')
        .replace(/<\/strong>/g, '**')

        .replace(/<b>/g, '**')
        .replace(/<\/b>/g, '**')

        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '')

        .replace(/<em>/g, '')
        .replace(/<\/em>/g, '')

        .replace(/\*\*+/g, '**')

        .replace(/<hr\/>/g, '---')
        .replace(/<script src=".*?">/g, '')

        .replace(/\<script type=.*}..\<\/script\>/g, '$1')

        //両方リンクの場合
        .replace(/\[http.*?\]\((.*?)\)/g, '$1')

        .replace(/\*\*\[(.*?)\]\((.*?)\)\*\*/g, '\[\*\*$1\*\*\]\($2\)')
        .replace(/\*\*\[\*\*(.*?)\*\*\]\((.*?)\)\*\*/g, '\[\*\*$1\*\*\]\($2\)')

        .replace(/<\w*?>/g, '')
        .replace(/<\/\w*?>/g, '')

        .replace(/^・/g, '\- ')
        .replace(/\*\**/g, '**')

    return text;
};

//---------------------------------------------------
//Wordpressのコードをマークダウン記法へ変換する関数
function ToMarkdown() {

    //テキストエリア内のテキストを取得
    let text = document.getElementById("textarea").value;

    //使用に注意が必要な表現を着色する関数
    text = ToMarkdownReplace(text);

    //入力されたテキストをサニタイジングする関数
    let after_text = Sanitizing(text);

    //表示ボックスに書き込む
    document.getElementById("box").innerHTML = after_text;
};


//---------------------------------------------------

//英数字の全角括弧と日本語の半角括弧を矯正する処理をする関数
function KakkoReplace(text) {

    // リンクをmarkdown用に編集
    text = text
        //英数字の全角括弧を半角括弧へ置換する。
        .replace(/\（([0-9a-zA-Z])/g, '\($1')
        .replace(/([0-9a-zA-Z])\）/g, '$1\)')

        //日本語の半角括弧を全角括弧へ置換
        .replace(/\(([\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf])/g, '\（$1')
        .replace(/([\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf])\)/g, '$1\）')

        .replace(/\（(.*?)\)/g, '\（$1）')
        .replace(/\((.*?)\）/g, '\($1)')

    return text;
};


//英数字の全角括弧と日本語の半角括弧を矯正する関数
function Kakko() {

    //テキストエリア内のテキストを取得
    let text = document.getElementById("textarea").value;

    //使用に注意が必要な表現を着色する関数
    text = KakkoReplace(text);

    //入力されたテキストをサニタイジングする関数
    let after_text = Sanitizing(text);

    //表示ボックスに書き込む
    document.getElementById("box").innerHTML = after_text;
};



//英数字の全角括弧と日本語の半角括弧を矯正する処理をする関数
function MyTextReplace(text) {

    // リンクをmarkdown用に編集
    text = text
        //英数字の全角括弧を半角括弧へ置換する。
        .replace(/a/g, 'a')

    return text;
};


function MyReplace() {

    //テキストエリア内のテキストを取得
    let text = document.getElementById("textarea").value;

    //使用に注意が必要な表現を着色する関数
    text = MyTextReplace(text);

    //入力されたテキストをサニタイジングする関数
    let after_text = Sanitizing(text);

    //表示ボックスに書き込む
    document.getElementById("box").innerHTML = after_text;
};



//---------------------------------------------------
//英単語の先頭文字を大文字にし、2文字目以降の英字を小文字に変換する
function text_case(text) {

    let text_case = document.getElementsByName('text_case');

    if (text_case[0].checked) {
        // 英単語の先頭文字を大文字にし、2文字目以降の英字を小文字に変換
        let Sentence = text.split(/(.+?(?:。<br \/>|．<br \/>|！<br \/>|？<br \/>|<br \/>|\s|。|．|！|？))/).filter(s => s.length > 0);
        for (let i = 0; i < Sentence.length; i++) {
            // リンクをmarkdown用に編集
            Sentence[i] = Sentence[i]
                //小文字に変換
                .toLowerCase()
                //最初の1文字だけを大文字に変換。
                .charAt(0).toUpperCase() + Sentence[i].slice(1).toLowerCase();
        };
        //読点で分割した文章を元に戻す。
        text = Sentence.join("");
    } else if (text_case[1].checked) {
        // 全て大文字に変換
        text = text.toUpperCase()
    } else if (text_case[2].checked) {
        // 全て小文字に変換
        text = text.toLowerCase()
    } else if (text_case[3].checked) {
        // スネークケースに変換
        text = text.toLowerCase();
        text = text.replace(/ +/g, '_').replace(/_\n/g, '\n');
    } else if (text_case[4].checked) {
        // ケバブケースに変換
        text = text.toLowerCase();
        text = text.replace(/ +/g, '-').replace(/\-\n/g, '\n');
    } else if (text_case[5].checked) {
        //キャメルケース（キャメルノーテーション）に変換。
        let Sentence = text.split(/(.+?(?:。<br \/>|．<br \/>|！<br \/>|？<br \/>|<br \/>|\s|。|．|！|？))/).filter(s => s.length > 0);
        for (let i = 0; i < Sentence.length; i++) {
            // リンクをmarkdown用に編集
            if (i === 0) {
                Sentence[i] = Sentence[i]
                    //小文字に変換
                    .toLowerCase()
            } else {
                Sentence[i] = Sentence[i]
                    //小文字に変換
                    .toLowerCase()
                    //最初の1文字だけを大文字に変換。
                    .charAt(0).toUpperCase() + Sentence[i].slice(1).toLowerCase();
            };
        };
        //読点で分割した文章を元に戻す。
        text = Sentence.join("");
        text = text.replace(/ +/g, "");
    } else if (text_case[6].checked) {
        //パスカルケース（アッパーキャメルケース）に変換
        let Sentence = text.split(/(.+?(?:。<br \/>|．<br \/>|！<br \/>|？<br \/>|<br \/>|\s|。|．|！|？))/).filter(s => s.length > 0);
        for (let i = 0; i < Sentence.length; i++) {
            // リンクをmarkdown用に編集
            Sentence[i] = Sentence[i]
                //小文字に変換
                .toLowerCase()
                //最初の1文字だけを大文字に変換。
                .charAt(0).toUpperCase() + Sentence[i].slice(1).toLowerCase();
        };
        //読点で分割した文章を元に戻す。
        text = Sentence.join("");
        text = text.replace(/ +/g, "");
    };

    return text;
};


//英単語の先頭文字を大文字にし、2文字目以降の英字を小文字に変換する関数
function ProperReplace() {

    //テキストエリア内のテキストを取得
    let text = document.getElementById("textarea").value;

    //使用に注意が必要な表現を着色する関数
    text = text_case(text);

    //入力されたテキストをサニタイジングする関数
    let after_text = Sanitizing(text);

    //表示ボックスに書き込む
    document.getElementById("box").innerHTML = after_text;
};


//---------------------------------------------------

function ExampleTextMarkdownToImg() {
    document.getElementById("textarea").innerHTML
        = "![画像タイトル](画像のURL)";
    ButtonInvisible();
    MarkdownToImg();
};

//サンプルを入力するボタンを出現させる関数
function ExampleTextButtonAppearanceMarkdownToImg() {
    document.getElementById("ExampleTextButton").innerHTML
        = `<a class= "c-button pb-2 m-1" onclick="ExampleTextMarkdownToImg()">サンプルを入力する</a> `
};


//---------------------------------------------------
function ExampleTextKakko() {
    document.getElementById("textarea").innerHTML
        = "朝食(パン)を食べました。";
    ButtonInvisible();
    Kakko();
};

//サンプルを入力するボタンを出現させる関数
function ExampleTextButtonAppearanceKakko() {
    document.getElementById("ExampleTextButton").innerHTML
        = `<a class= "c-button pb-2 m-1" onclick="ExampleTextKakko()">例文を入力する</a> `
};

//---------------------------------------------------
//サンプルを入力するボタンを見えなくする関数
function ButtonInvisible() {
    //テキストエリア内のテキストを取得
    let text = document.getElementById("textarea").value;
    text = Sanitizing(text);
    let TextLength = text.replace(/<br \/>/g, '').length;

    if (TextLength === 0) {
        document.getElementById("textarea").innerHTML = '';
    } else if (TextLength > 1) {
        document.getElementById("ExampleTextButton").innerHTML = ""
    };
};



