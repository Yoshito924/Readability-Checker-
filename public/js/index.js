'use strict';

// 小数点第3位以下を切り捨てる関数 (JavaScriptには元からそういう関数が無いっぽいので)
function FloorToThree(num) {
    return +(Math.floor(num + "e+3") + "e-3");
};

//入力されたテキストをサニタイジング(エスケープ処理)する関数
function Sanitizing(text) {
    text = text
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n\n\n+/g, "<br \/><br \/>")
        .replace(/\n/g, "<br \/>");

    return text;
};

//使用に注意が必要な表現を着色し、文章を採点する関数
function PaintText(text) {

    //満点(スタート時の点数)
    let Score = 100;

    //テキストの長さを取得する
    let TextLength = text
        .replace(/<br \/>/g, '')
        .length;

    let NoSpaceTextLength = text
        .replace(/<br \/>/g, '')
        .replace(/　/g, '')
        .replace(/ /g, '')
        .length;

    //文章を読点などで分割して配列に格納する。(区切り文字を直前の要素に含める)
    let Sentence = text.split(/(.+?(?:。<br \/>|．<br \/>|！<br \/>|？<br \/>|<br \/>|。|．|！|？))/).filter(s => s.length > 0);
    let NoSpaceSentence = text.split(/(.+?(?:。<br \/>|．<br \/>|！<br \/>|？<br \/>|<br \/>|。|．|！|？))/).filter(s => s.length > 0);

    let LongSentenceCount = 0;
    let SuperLongSentenceCount = 0;
    let ExcessTextPoint = 0;
    let SuperExcessTextPoint = 0;

    //既定の文字数を超える文章にハイライトをつけつつ採点する。
    for (let i = 0; i < Sentence.length; i++) {
        if (Sentence[i].replace(/<br \/>/g, '').length >= 100) {
            //1文で100文字を超える場合
            Sentence.splice(i, 1, `<mark5>${Sentence[i]}</mark5>`);
            //8点減点
            Score = Score - 8;
            Score = Score - ((Sentence[i].replace(/<br \/>/g, '').length - 100) * 0.3)
            SuperExcessTextPoint = SuperExcessTextPoint + ((Sentence[i].replace(/<br \/>/g, '').length - 100) * 0.3)
            //長文のカウンター
            SuperLongSentenceCount++
            LongSentenceCount++
        } else if (Sentence[i].replace(/<br \/>/g, '').length >= 60) {
            //1文で60文字を超える場合
            Sentence.splice(i, 1, `<mark4>${Sentence[i]}</mark4>`);
            //3点減点
            Score = Score - 3;
            Score = Score - ((Sentence[i].replace(/<br \/>/g, '').length - 60) * 0.1)
            ExcessTextPoint = (ExcessTextPoint + (Sentence[i].replace(/<br \/>/g, '').length - 60) * 0.1)
            //長文のカウンター
            LongSentenceCount++
        };
    };

    //読点で分割した文章を元に戻す。
    text = Sentence.join("");

    //使用に注意が必要な表現にハイライトをつける。
    text = text
        .replace(/(どもの)/g, 'ドモノ')

        //------------------------------

        .replace(/(という)/g, '<mark1>$1</mark1>')
        .replace(/(といった)/g, '<mark1>$1</mark1>')

        .replace(/(ような)/g, '<mark1>$1</mark1>')
        .replace(/(ように)/g, '<mark1>$1</mark1>')

        .replace(/(もの)/g, '<mark1>$1</mark1>')
        .replace(/(こと)/g, '<mark1>$1</mark1>')

        .replace(/(ついて)/g, '<mark1>$1</mark1>')
        .replace(/(くらい)/g, '<mark1>$1</mark1>')
        .replace(/(ぐらい)/g, '<mark1>$1</mark1>')

        //受け身表現
        .replace(/(られる)/g, '<mark1>$1</mark1>')
        .replace(/(られた)/g, '<mark1>$1</mark1>')
        .replace(/(られて)/g, '<mark1>$1</mark1>')
        .replace(/(られます)/g, '<mark1>$1</mark1>')
        .replace(/(られました)/g, '<mark1>$1</mark1>')

        //見直すべき
        .replace(/(など)/g, '<mark2>$1</mark2>')

        .replace(/(が、)/g, '<mark2>$1</mark2>')
        .replace(/(ましたが)/g, '<mark2>$1</mark2>')
        .replace(/(りますが)/g, '<mark2>$1</mark2>')
        .replace(/(けれど)/g, '<mark2>$1</mark2>')
        .replace(/(だけど)/g, '<mark2>$1</mark2>')

        .replace(/(いろんな)/g, '<mark2>$1</mark2>')
        .replace(/(じゃあ)/g, '<mark2>$1</mark2>')
        .replace(/(それから)/g, '<mark2>$1</mark2>')
        .replace(/(ちっとも)/g, '<mark2>$1</mark2>')

        .replace(/(まぁ)/g, '<mark2>$1</mark2>')
        .replace(/(まあ)/g, '<mark2>$1</mark2>')

        .replace(/(ところ)/g, '<mark2>$1</mark2>')

        .replace(/(とともに)/g, '<mark2>$1</mark2>')
        .replace(/(と共に)/g, '<mark2>$1</mark2>')

        .replace(/(なるはや)/g, '<mark2>$1</mark2>')
        .replace(/(説明不要)/g, '<mark2>$1</mark2>')

        .replace(/(たり)/g, '<mark2>$1</mark2>')

        .replace(/(マジ)/g, '<mark2>$1</mark2>')
        .replace(/(同様)/g, '<mark2>$1</mark2>')
        .replace(/(絶対)/g, '<mark2>$1</mark2>')
        .replace(/(本当)/g, '<mark2>$1</mark2>')
        .replace(/(こだわり)/g, '<mark2>$1</mark2>')
        .replace(/(いくつか)/g, '<mark2>$1</mark2>')
        .replace(/(とくに)/g, '<mark2>$1</mark2>')
        .replace(/(特に)/g, '<mark2>$1</mark2>')
        .replace(/(いろいろ)/g, '<mark2>$1</mark2>')
        .replace(/(色々)/g, '<mark2>$1</mark2>')
        .replace(/(おそらく)/g, '<mark2>$1</mark2>')
        .replace(/(恐らく)/g, '<mark2>$1</mark2>')
        .replace(/(とても)/g, '<mark2>$1</mark2>')
        .replace(/(いっぱい)/g, '<mark2>$1</mark2>')
        .replace(/(かなり)/g, '<mark2>$1</mark2>')
        .replace(/(きっと)/g, '<mark2>$1</mark2>')
        .replace(/(すごく)/g, '<mark2>$1</mark2>')
        .replace(/(とても)/g, '<mark2>$1</mark2>')
        .replace(/(ちょっと)/g, '<mark2>$1</mark2>')
        .replace(/(いわゆる)/g, '<mark2>$1</mark2>')

        // 括弧
        .replace(/(\）\　)/g, '<mark2>$1</mark2>')
        .replace(/(　\）)/g, '<mark2>$1</mark2>')
        .replace(/(\（\　)/g, '<mark2>$1</mark2>')
        .replace(/(　\（)/g, '<mark2>$1</mark2>')

        .replace(/(\)\　)/g, '<mark2>$1</mark2>')
        .replace(/(　\))/g, '<mark2>$1</mark2>')
        .replace(/(\(\　)/g, '<mark2>$1</mark2>')
        .replace(/(　\()/g, '<mark2>$1</mark2>')

        .replace(/(\) )/g, '<mark2>$1</mark2>')
        .replace(/(\ \))/g, '<mark2>$1</mark2>')
        .replace(/(\( )/g, '<mark2>$1</mark2>')
        .replace(/(\ \()/g, '<mark2>$1</mark2>')

        .replace(/(\） )/g, '<mark2>$1</mark2>')
        .replace(/(\ \）)/g, '<mark2>$1</mark2>')
        .replace(/(\（ )/g, '<mark2>$1</mark2>')
        .replace(/(\ \（)/g, '<mark2>$1</mark2>')

        //特定の漢字表現
        .replace(/(所謂)/g, '<mark2>$1</mark2>')
        .replace(/(我が)/g, '<mark2>$1</mark2>')
        .replace(/(凡そ)/g, '<mark2>$1</mark2>')
        .replace(/(及び)/g, '<mark2>$1</mark2>')
        .replace(/(然し)/g, '<mark2>$1</mark2>')
        .replace(/(即ち)/g, '<mark2>$1</mark2>')
        .replace(/(何故)/g, '<mark2>$1</mark2>')
        .replace(/(是非)/g, '<mark2>$1</mark2>')
        .replace(/(段々)/g, '<mark2>$1</mark2>')
        .replace(/(或いは)/g, '<mark2>$1</mark2>')
        .replace(/(予め)/g, '<mark2>$1</mark2>')
        .replace(/(流石)/g, '<mark2>$1</mark2>')
        .replace(/(更に)/g, '<mark2>$1</mark2>')
        .replace(/(故に)/g, '<mark2>$1</mark2>')
        .replace(/(因みに)/g, '<mark2>$1</mark2>')
        .replace(/(並びに)/g, '<mark2>$1</mark2>')
        .replace(/(却って)/g, '<mark2>$1</mark2>')
        .replace(/(直に)/g, '<mark2>$1</mark2>')
        .replace(/(等)/g, '<mark2>$1</mark2>')
        .replace(/(程)/g, '<mark2>$1</mark2>')
        .replace(/(筈)/g, '<mark2>$1</mark2>')
        .replace(/(殆ど)/g, '<mark2>$1</mark2>')
        .replace(/(僅か)/g, '<mark2>$1</mark2>')
        .replace(/(迄)/g, '<mark2>$1</mark2>')
        .replace(/(概ね)/g, '<mark2>$1</mark2>')
        .replace(/(余り)/g, '<mark2>$1</mark2>')
        .replace(/(人達)/g, '<mark2>$1</mark2>')
        .replace(/(一寸)/g, '<mark2>$1</mark2>')
        .replace(/(但し)/g, '<mark2>$1</mark2>')
        .replace(/(敢えて)/g, '<mark2>$1</mark2>')
        .replace(/(丁度)/g, '<mark2>$1</mark2>')
        .replace(/(出来る)/g, '<mark2>$1</mark2>')
        .replace(/(可笑しい)/g, '<mark2>$1</mark2>')
        .replace(/(由々しい)/g, '<mark2>$1</mark2>')
        .replace(/(有る)/g, '<mark2>$1</mark2>')
        .replace(/(無い)/g, '<mark2>$1</mark2>')
        //注意するべき指示語

        .replace(/(これ)/g, '<mark3>$1</mark3>')
        .replace(/(これら)/g, '<mark3>$1</mark3>')
        .replace(/(ここ)/g, '<mark3>$1</mark3>')
        .replace(/(こちら)/g, '<mark3>$1</mark3>')
        .replace(/(こっち)/g, '<mark3>$1</mark3>')
        .replace(/(この)/g, '<mark3>$1</mark3>')
        .replace(/(こう)/g, '<mark3>$1</mark3>')
        .replace(/(こんな)/g, '<mark3>$1</mark3>')
        .replace(/(こいつ)/g, '<mark3>$1</mark3>')

        .replace(/(それ)/g, '<mark3>$1</mark3>')
        .replace(/(それら)/g, '<mark3>$1</mark3>')
        .replace(/(そこ)/g, '<mark3>$1</mark3>')
        .replace(/(そちら)/g, '<mark3>$1</mark3>')
        .replace(/(そっち)/g, '<mark3>$1</mark3>')
        .replace(/(その)/g, '<mark3>$1</mark3>')
        .replace(/(そう)/g, '<mark3>$1</mark3>')
        .replace(/(そんな)/g, '<mark3>$1</mark3>')
        .replace(/(そいつ)/g, '<mark3>$1</mark3>')

        .replace(/(あれ)/g, '<mark3>$1</mark3>')
        .replace(/(あそこ)/g, '<mark3>$1</mark3>')
        .replace(/(あちら)/g, '<mark3>$1</mark3>')
        .replace(/(あっち)/g, '<mark3>$1</mark3>')
        .replace(/(あの)/g, '<mark3>$1</mark3>')
        .replace(/(ああ)/g, '<mark3>$1</mark3>')
        .replace(/(あんな)/g, '<mark3>$1</mark3>')
        .replace(/(あいつ)/g, '<mark3>$1</mark3>')

        .replace(/(どれ)/g, '<mark3>$1</mark3>')
        .replace(/(どこ)/g, '<mark3>$1</mark3>')
        .replace(/(どちら)/g, '<mark3>$1</mark3>')
        .replace(/(どっち)/g, '<mark3>$1</mark3>')
        .replace(/(どの)/g, '<mark3>$1</mark3>')
        .replace(/(どう)/g, '<mark3>$1</mark3>')
        .replace(/(どんな)/g, '<mark3>$1</mark3>')
        .replace(/(どいつ)/g, '<mark3>$1</mark3>')

        .replace(/(コレ)/g, '<mark3>$1</mark3>')
        .replace(/(其れ)/g, '<mark3>$1</mark3>')
        .replace(/(此処)/g, '<mark3>$1</mark3>')
        .replace(/(其処)/g, '<mark3>$1</mark3>')
        .replace(/(何処)/g, '<mark3>$1</mark3>')
        .replace(/(何時)/g, '<mark3>$1</mark3>')
        .replace(/(或る)/g, '<mark3>$1</mark3>')
        .replace(/(此の)/g, '<mark3>$1</mark3>')
        .replace(/(其の)/g, '<mark3>$1</mark3>')

        .replace(/(貴方)/g, '<mark3>$1</mark3>')
        .replace(/(何方)/g, '<mark3>$1</mark3>')

        //その他注意するべき表現
        .replace(/(ソーシャルネットワークサービス)/g, '<mark6>$1</mark6>')
        .replace(/(ジャスト.インフォメーション)/g, '<mark6>$1</mark6>')
        .replace(/(グローバル.スタンダード)/g, '<mark6>$1</mark6>')
        .replace(/(ダイナミックプライシング)/g, '<mark6>$1</mark6>')
        .replace(/(デファクト.スタンダード)/g, '<mark6>$1</mark6>')
        .replace(/(コストパフォーマンス )/g, '<mark6>$1</mark6>')
        .replace(/(スクラップアンドビルド)/g, '<mark6>$1</mark6>')
        .replace(/(デファクトスタンダード)/g, '<mark6>$1</mark6>')
        .replace(/(コンティンジェンシー)/g, '<mark6>$1</mark6>')
        .replace(/(ブランド.エクイティ)/g, '<mark6>$1</mark6>')
        .replace(/(ブランドエクイティ)/g, '<mark6>$1</mark6>')
        .replace(/(エクスクルージョン)/g, '<mark6>$1</mark6>')
        .replace(/(ジャスト.アイデア)/g, '<mark6>$1</mark6>')
        .replace(/(ダイバーシティ )/g, '<mark6>$1</mark6>')
        .replace(/(ベストプラクティス)/g, '<mark6>$1</mark6>')
        .replace(/(アウトソーシング)/g, '<mark6>$1</mark6>')
        .replace(/(アクセシビリティ)/g, '<mark6>$1</mark6>')
        .replace(/(インタラクティブ)/g, '<mark6>$1</mark6>')
        .replace(/(インテリジェンス)/g, '<mark6>$1</mark6>')
        .replace(/(インフルエンサー)/g, '<mark6>$1</mark6>')
        .replace(/(エスカレーション)/g, '<mark6>$1</mark6>')
        .replace(/(コアコンピタンス)/g, '<mark6>$1</mark6>')
        .replace(/(コンプライアンス)/g, '<mark6>$1</mark6>')
        .replace(/(サードパーティー)/g, '<mark6>$1</mark6>')
        .replace(/(サステナビリティ)/g, '<mark6>$1</mark6>')
        .replace(/(ジャストアイデア)/g, '<mark6>$1</mark6>')
        .replace(/(シンギュラリティ)/g, '<mark6>$1</mark6>')
        .replace(/(ステークホルダー)/g, '<mark6>$1</mark6>')
        .replace(/(データマイニング)/g, '<mark6>$1</mark6>')
        .replace(/(ニアリーイコール)/g, '<mark6>$1</mark6>')
        .replace(/(ネゴシエーション)/g, '<mark6>$1</mark6>')
        .replace(/(ユーティリティー)/g, '<mark6>$1</mark6>')
        .replace(/(レギュレーション)/g, '<mark6>$1</mark6>')
        .replace(/(アウトバウンド)/g, '<mark6>$1</mark6>')
        .replace(/(イテレーション)/g, '<mark6>$1</mark6>')
        .replace(/(イノベーション)/g, '<mark6>$1</mark6>')
        .replace(/(インクルーシブ)/g, '<mark6>$1</mark6>')
        .replace(/(インセンティブ)/g, '<mark6>$1</mark6>')
        .replace(/(エクスキューズ)/g, '<mark6>$1</mark6>')
        .replace(/(オポチュニティ)/g, '<mark6>$1</mark6>')
        .replace(/(オペレーション)/g, '<mark6>$1</mark6>')
        .replace(/(キュレーション)/g, '<mark6>$1</mark6>')
        .replace(/(コミットメント)/g, '<mark6>$1</mark6>')
        .replace(/(コモディティ化)/g, '<mark6>$1</mark6>')
        .replace(/(コンソーシアム)/g, '<mark6>$1</mark6>')
        .replace(/(コンバージョン)/g, '<mark6>$1</mark6>')
        .replace(/(コンピテンシー)/g, '<mark6>$1</mark6>')
        .replace(/(ステートメント)/g, '<mark6>$1</mark6>')
        .replace(/(スレッショルド)/g, '<mark6>$1</mark6>')
        .replace(/(ダイバーシティ)/g, '<mark6>$1</mark6>')
        .replace(/(ドラスティック)/g, '<mark6>$1</mark6>')
        .replace(/(パフォーマンス)/g, '<mark6>$1</mark6>')
        .replace(/(フィードバック)/g, '<mark6>$1</mark6>')
        .replace(/(フィジビリティ)/g, '<mark6>$1</mark6>')
        .replace(/(プライオリティ)/g, '<mark6>$1</mark6>')
        .replace(/(プログレッシブ)/g, '<mark6>$1</mark6>')
        .replace(/(フロントエンド)/g, '<mark6>$1</mark6>')
        .replace(/(マイルストーン)/g, '<mark6>$1</mark6>')
        .replace(/(モチベーション)/g, '<mark6>$1</mark6>')
        .replace(/(リノベーション)/g, '<mark6>$1</mark6>')
        .replace(/(アサーティブ)/g, '<mark6>$1</mark6>')
        .replace(/(アライアンス)/g, '<mark6>$1</mark6>')
        .replace(/(アンバサダー)/g, '<mark6>$1</mark6>')
        .replace(/(イニシアチブ)/g, '<mark6>$1</mark6>')
        .replace(/(イノベーター)/g, '<mark6>$1</mark6>')
        .replace(/(インバウンド)/g, '<mark6>$1</mark6>')
        .replace(/(エコシステム)/g, '<mark6>$1</mark6>')
        .replace(/(オーソライズ)/g, '<mark6>$1</mark6>')
        .replace(/(クライアント)/g, '<mark6>$1</mark6>')
        .replace(/(クロージング)/g, '<mark6>$1</mark6>')
        .replace(/(コミュニティ)/g, '<mark6>$1</mark6>')
        .replace(/(コンセンサス)/g, '<mark6>$1</mark6>')
        .replace(/(コンテキスト)/g, '<mark6>$1</mark6>')
        .replace(/(コンテクスト)/g, '<mark6>$1</mark6>')
        .replace(/(ディシジョン)/g, '<mark6>$1</mark6>')
        .replace(/(ディシジョン)/g, '<mark6>$1</mark6>')
        .replace(/(デッドライン)/g, '<mark6>$1</mark6>')
        .replace(/(バックエンド)/g, '<mark6>$1</mark6>')
        .replace(/(ハレーション)/g, '<mark6>$1</mark6>')
        .replace(/(ハンドリング)/g, '<mark6>$1</mark6>')
        .replace(/(フィーチャー)/g, '<mark6>$1</mark6>')
        .replace(/(フルコミット)/g, '<mark6>$1</mark6>')
        .replace(/(ベネフィット)/g, '<mark6>$1</mark6>')
        .replace(/(ペンディング)/g, '<mark6>$1</mark6>')
        .replace(/(ボトルネック)/g, '<mark6>$1</mark6>')
        .replace(/(ポリバレント)/g, '<mark6>$1</mark6>')
        .replace(/(モノリシック)/g, '<mark6>$1</mark6>')
        .replace(/(リスクヘッジ)/g, '<mark6>$1</mark6>')
        .replace(/(アイディア)/g, '<mark6>$1</mark6>')
        .replace(/(アクセプト)/g, '<mark6>$1</mark6>')
        .replace(/(アジェンダ)/g, '<mark6>$1</mark6>')
        .replace(/(アジャイル)/g, '<mark6>$1</mark6>')
        .replace(/(アジャスト)/g, '<mark6>$1</mark6>')
        .replace(/(エビデンス)/g, '<mark6>$1</mark6>')
        .replace(/(カバレッジ)/g, '<mark6>$1</mark6>')
        .replace(/(カバレッジ)/g, '<mark6>$1</mark6>')
        .replace(/(コンセプト)/g, '<mark6>$1</mark6>')
        .replace(/(コンテンツ)/g, '<mark6>$1</mark6>')
        .replace(/(コンパイル)/g, '<mark6>$1</mark6>')
        .replace(/(シュリンク)/g, '<mark6>$1</mark6>')
        .replace(/(スクリプト)/g, '<mark6>$1</mark6>')
        .replace(/(セグメント)/g, '<mark6>$1</mark6>')
        .replace(/(ゼロベース)/g, '<mark6>$1</mark6>')
        .replace(/(デフォルト)/g, '<mark6>$1</mark6>')
        .replace(/(ノーティス)/g, '<mark6>$1</mark6>')
        .replace(/(バジェット)/g, '<mark6>$1</mark6>')
        .replace(/(パラダイム)/g, '<mark6>$1</mark6>')
        .replace(/(ハンズオン)/g, '<mark6>$1</mark6>')
        .replace(/(フィジビリ)/g, '<mark6>$1</mark6>')
        .replace(/(フィックス)/g, '<mark6>$1</mark6>')
        .replace(/(マテリアル)/g, '<mark6>$1</mark6>')
        .replace(/(ミッション)/g, '<mark6>$1</mark6>')
        .replace(/(ユビキタス)/g, '<mark6>$1</mark6>')
        .replace(/(リテラシー)/g, '<mark6>$1</mark6>')
        .replace(/(ASAP)/g, '<mark6>$1</mark6>')
        .replace(/(MECE)/g, '<mark6>$1</mark6>')
        .replace(/(アグリー)/g, '<mark6>$1</mark6>')
        .replace(/(アセット)/g, '<mark6>$1</mark6>')
        .replace(/(アサイン)/g, '<mark6>$1</mark6>')
        .replace(/(イシュー)/g, '<mark6>$1</mark6>')
        .replace(/(オンスケ)/g, '<mark6>$1</mark6>')
        .replace(/(キャズム)/g, '<mark6>$1</mark6>')
        .replace(/(コミット)/g, '<mark6>$1</mark6>')
        .replace(/(サポート)/g, '<mark6>$1</mark6>')
        .replace(/(サンプル)/g, '<mark6>$1</mark6>')
        .replace(/(シナジー)/g, '<mark6>$1</mark6>')
        .replace(/(スキーム)/g, '<mark6>$1</mark6>')
        .replace(/(デプロイ)/g, '<mark6>$1</mark6>')
        .replace(/(ドリブン)/g, '<mark6>$1</mark6>')
        .replace(/(トレンド)/g, '<mark6>$1</mark6>')
        .replace(/(ナレッジ)/g, '<mark6>$1</mark6>')
        .replace(/(ノウハウ)/g, '<mark6>$1</mark6>')
        .replace(/(バッファ)/g, '<mark6>$1</mark6>')
        .replace(/(ファクト)/g, '<mark6>$1</mark6>')
        .replace(/(フェーズ)/g, '<mark6>$1</mark6>')
        .replace(/(ミーシー)/g, '<mark6>$1</mark6>')
        .replace(/(ミッシー)/g, '<mark6>$1</mark6>')
        .replace(/(メソッド)/g, '<mark6>$1</mark6>')
        .replace(/(メディア)/g, '<mark6>$1</mark6>')
        .replace(/(メンター)/g, '<mark6>$1</mark6>')
        .replace(/(ユーザー)/g, '<mark6>$1</mark6>')
        .replace(/(ユーザー)/g, '<mark6>$1</mark6>')
        .replace(/(リソース)/g, '<mark6>$1</mark6>')
        .replace(/(リバイズ)/g, '<mark6>$1</mark6>')
        .replace(/(ルーチン)/g, '<mark6>$1</mark6>')
        .replace(/(レイヤー)/g, '<mark6>$1</mark6>')
        .replace(/(2\.0)/g, '<mark6>$1</mark6>')
        .replace(/(FYI)/g, '<mark6>$1</mark6>')
        .replace(/(IoT)/g, '<mark6>$1</mark6>')
        .replace(/(KPI)/g, '<mark6>$1</mark6>')
        .replace(/(コスパ)/g, '<mark6>$1</mark6>')
        .replace(/(タイト)/g, '<mark6>$1</mark6>')
        .replace(/(ツール)/g, '<mark6>$1</mark6>')
        .replace(/(テレコ)/g, '<mark6>$1</mark6>')
        .replace(/(ニッチ)/g, '<mark6>$1</mark6>')
        .replace(/(ノルマ)/g, '<mark6>$1</mark6>')
        .replace(/(マスト)/g, '<mark6>$1</mark6>')
        .replace(/(マター)/g, '<mark6>$1</mark6>')
        .replace(/(マター)/g, '<mark6>$1</mark6>')
        .replace(/(モダン)/g, '<mark6>$1</mark6>')
        .replace(/(リスケ)/g, '<mark6>$1</mark6>')
        .replace(/(AI)/g, '<mark6>$1</mark6>')

        //---------------------------------------

        .replace(/(ドモノ)/g, 'どもの')


    //赤チェックひとつにつき4点減点
    let RedCount = (text.match(/<mark1>/g) || []).length;
    Score = Score - (RedCount * 4);

    //見直すべき語がセンテンスの数の8割より多い場合、上回る見直すべき語の数だけ2点減点
    let WarningCount = (text.match(/<mark2>/g) || []).length;
    let WarningScoreText;
    if (WarningCount >= (NoSpaceSentence.length * 0.6)) {
        Score = Score - (2 * (WarningCount - Math.round(NoSpaceSentence.length * 0.6)));
        let WarningScore = (2 * (WarningCount - Math.round(NoSpaceSentence.length * 0.6)));
        WarningScoreText = `${WarningCount}≧${FloorToThree(NoSpaceSentence.length * 0.6)}　∴減点：2×(${WarningCount}-${Math.round(NoSpaceSentence.length * 0.6)})=${WarningScore}`;
    } else {
        WarningScoreText = `${WarningCount}＜${FloorToThree(NoSpaceSentence.length * 0.6)}　∴減点：0`;
    };

    //指示語がセンテンスの数の8割より多い場合、上回る指示語の数だけ2点減点
    let DemonstrativeCount = (text.match(/<mark3>/g) || []).length;
    let DemonstrativeScoreText;
    if (DemonstrativeCount >= (NoSpaceSentence.length * 0.5)) {
        Score = Score - (2 * (DemonstrativeCount - Math.round(NoSpaceSentence.length * 0.5)));
        let DemonstrativeScore = (2 * (DemonstrativeCount - Math.round(NoSpaceSentence.length * 0.5)));
        DemonstrativeScoreText = `${DemonstrativeCount}≧${FloorToThree(NoSpaceSentence.length * 0.5)}　∴減点：2×(${DemonstrativeCount}-${Math.round(NoSpaceSentence.length * 0.5)})=${DemonstrativeScore}`;
    } else {
        DemonstrativeScoreText = `${DemonstrativeCount}＜${FloorToThree(NoSpaceSentence.length * 0.5)}　∴減点：0`;
    };

    //特定カタカナ英語の数の2乗点減点
    let KatakanaCount = (text.match(/<mark6>/g) || []).length;
    Score = Score - KatakanaCount ** 1.4;
    let KatakanaScore = KatakanaCount ** 1.4;
    let ScoreText;
    let ReviewText;
    let TextData;
    //採点結果のテキスト
    if (NoSpaceTextLength >= 10) {
        ScoreText = `この文章の読みやすさは、<font size="10">${Math.floor(Score)}</font>点です。`;
        ReviewText = "";
        if (Score > 90) {
            ReviewText = '読みやすい文章です！(๑˃̵ᴗ˂̵)و<br>誤字・脱字や表記ゆれには気を付けてください！';
        } else if (Score >= 70) {
            ReviewText = 'まぁまぁ読みやすい文章です！(´▽`;)<br>もう少し推敲すると、さらに読みやすくなるでしょう！';
        } else if (Score >= 50) {
            ReviewText = 'ちょっと読みにくい文章です。(Ｔ▽Ｔ)<br>直せる部分がたくさんあるでしょう。';
        } else if (Score >= 20) {
            ReviewText = '読みにくい文章です。(´;ω;｀)<br>多くを書き直す必要があるでしょう…。';
        } else if (Score >= 0) {
            ReviewText = 'かなり読みにくい文章です。｡ﾟﾟ(´□`｡)°ﾟ｡<br>読み手は、意味を汲み取るのに苦労するでしょう…。';
        } else if (Score >= -150) {
            ReviewText = '読みにくすぎます！(」ﾟﾛﾟ)」<br>"相手に分かりやすく伝える意思"が感じられません。';
        } else if (Score >= -300) {
            ReviewText = '読みにくすぎます…(´Д｀;)<br>内容を正確に理解できる人間は、ほぼ居ないでしょう。';
        } else if (Score < -300) {
            ReviewText = '読みにくすぎます…( ゜A゜；)<br>まるで暗号です。読み手は"解読"する必要があるでしょう。';
        };
        TextData = `<span style="color:gray">文字数：${TextLength}<br>
        文字数(スペースを除く)：${NoSpaceTextLength}</span><br><br>
        <lu>
        <li>文の数：${NoSpaceSentence.length}</li>
        <li><mark1>赤チェック</mark1>の数：${RedCount}　<span style="color:gray"><font size="2">減点：4×${RedCount}=${4 * RedCount}</span></font></li>
        <li><mark2>黄チェック</mark2>の数：${WarningCount}　<span style="color:gray"><font size="2">${NoSpaceSentence.length}×0.6=${FloorToThree(NoSpaceSentence.length * 0.6)}　${WarningScoreText}</span></font></li>
        <li><mark3>指示語</mark3>の数：${DemonstrativeCount}　<span style="color:gray"><font size="2">${NoSpaceSentence.length}×0.5=${FloorToThree(NoSpaceSentence.length * 0.5)}　${DemonstrativeScoreText}</span></font></li>
        <li><mark4>60文字を超える文</mark4>の数：${LongSentenceCount}　<span style="color:gray"><font size="2">減点：3×${LongSentenceCount}=${3 * LongSentenceCount}　文字数超過による減点：${FloorToThree(ExcessTextPoint)}</span></font></li>
        <li><mark5>100文字を超える文</mark5>の数：${SuperLongSentenceCount}　<span style="color:gray"><font size="2">減点：8×${SuperLongSentenceCount}=${8 * SuperLongSentenceCount}　文字数超過による減点：${FloorToThree(SuperExcessTextPoint)}</span></font></li>
        <li><mark6>特定のカタカナ英語</mark6>の数：${KatakanaCount}　<span style="color:gray"><font size="2">減点：${KatakanaCount}^1.4=${FloorToThree(KatakanaScore)}</span></font></li>
        </lu><br>
        ※最終的な点数は、小数点以下を切り捨てています。<br>※採点はエンタメ要素です。真に受けすぎないでください。`
    } else {
        ScoreText = `この文章の読みやすさは、<font size="10">？</font>点です。`;
        ReviewText = "テキストを10文字以上入力してください。";
        TextData = `<span style="color:gray">文字数：${TextLength}<br>
        文字数(スペースを除く)：${NoSpaceTextLength}</span><br><br>`
    };
    let after_text = text;
    //採点結果の戻り値。
    return { ScoreText, ReviewText, TextData, after_text };
};


//使用に注意が必要な表現を着色して転記して点数を書き込む関数
function MarkingTextPosting() {

    //テキストエリア内のテキストを取得
    let text = document.getElementById("textarea").value;

    //入力されたテキストをサニタイジングする関数
    text = Sanitizing(text);

    //使用に注意が必要な表現を着色する関数
    let { ScoreText, ReviewText, TextData, after_text } = PaintText(text);

    //表示ボックスに書き込む
    document.getElementById("box").innerHTML = after_text;

    //点数を書き込む
    document.getElementById("ScoreBox").innerHTML = `${ScoreText}`;
    document.getElementById("review").innerHTML = `${ReviewText}`;
    document.getElementById("TextData").innerHTML = `${TextData}`;

};


function KeitaiToZyotai(text) {
    //テキストを置換する
    text = text
        .replace(/見ることができる/g, '見られる')
        .replace(/書くことができる/g, '書ける')
        .replace(/読むことができる/g, '読める')
        .replace(/食べることができる/g, '食べられる')
        .replace(/行うことができる/g, '行える')
        .replace(/喋ることができる/g, '喋られる')
        .replace(/挙げることができる/g, '挙げられる')
        .replace(/知ることができる/g, '知れる')
        .replace(/起こすことができる/g, '起こせる')
        .replace(/行うことができる/g, '行える')
        .replace(/使うことができる/g, '使える')

        .replace(/することができる/g, 'できる')
        .replace(/やることができる/g, 'やれる')
        .replace(/することができます/g, 'できる')
        .replace(/させることができます/g, 'できる')
        .replace(/やることができます/g, 'やれる')
        .replace(/することができません/g, 'できない')
        .replace(/やることができません/g, 'やれない')
        .replace(/できるようにすること/g, '可能にすること')
        .replace(/しているわけではありません/g, 'していない')
        .replace(/されているわけではありません/g, 'されていない')
        .replace(/できるようになった/g, '可能になった')

        .replace(/あるのですが/g, 'ある。しかし')

        .replace(/なんですよ/g, 'だ')
        .replace(/なのですよ/g, 'だ')


        .replace(/しますか/g, 'するだろうか')
        .replace(/ありませんでした/g, 'なかった')
        .replace(/わけではありませんが、/g, 'わけではない。しかし、')
        .replace(/わけではありませんが/g, 'わけではないが')

        .replace(/することがないように/g, 'しないように')
        .replace(/することのないように/g, 'しないように')
        .replace(/しなければならない/g, 'せよ')
        .replace(/行わなければならない/g, '行え')

        .replace(/されることを/g, 'を')
        .replace(/されることに/g, 'に')
        .replace(/されることは/g, 'は')
        .replace(/されることも/g, 'も')
        .replace(/することを/g, 'を')
        .replace(/することに/g, 'に')
        .replace(/することは/g, 'は')
        .replace(/することも/g, 'も')
        .replace(/でしたら/g, 'なら')

        .replace(/というような/g, '')
        .replace(/ということ/g, '」')
        .replace(/というもの/g, '」')
        .replace(/という/g, '')

        .replace(/申し上げます/g, '話す')
        .replace(/いただけない/g, 'くれない')

        .replace(/負います/g, '負う')
        .replace(/負いません/g, '負わない')
        .replace(/着ます/g, '着る')
        .replace(/過ぎます/g, '過ぎる')
        .replace(/閉じます/g, '閉じる')
        .replace(/落ちます/g, '落ちる')
        .replace(/煮ます/g, '煮る')
        .replace(/浴びます/g, '浴びる')
        .replace(/見ます/g, '見る')
        .replace(/含みます/g, '含む')
        .replace(/用います/g, '用いる')
        .replace(/作ります/g, '作る')
        .replace(/返します/g, '返す')
        .replace(/立ちます/g, '立つ')
        .replace(/付きます/g, '付く')
        .replace(/づきます/g, 'づく')
        .replace(/帰ります/g, '帰る')
        .replace(/並びます/g, '並ぶ')
        .replace(/並びます/g, '並ぶ')
        .replace(/囲みます/g, '囲う')
        .replace(/呼びます/g, '呼ぶ')
        .replace(/使いません/g, '使わない')
        .replace(/使います/g, '使う')
        .replace(/行いません/g, '行わない')
        .replace(/行います/g, '行う')
        .replace(/おこないました/g, 'おこなった')
        .replace(/言います/g, '言う')
        .replace(/言いません/g, '言わない')
        .replace(/いきます/g, 'いく')
        .replace(/いいます/g, 'いう')
        .replace(/除きます/g, '除く')
        .replace(/分かります/g, '分かる')
        .replace(/わかります/g, 'わかる')
        .replace(/分かりません/g, '分からない')
        .replace(/わかりません/g, 'わからない')
        .replace(/思います/g, '思う')
        .replace(/思いません/g, '思わない')
        .replace(/感じます/g, '感じる')
        .replace(/出来ます/g, '出来る')
        .replace(/できます/g, 'できる')
        .replace(/受け取ります/g, '受け取る')
        .replace(/従います/g, '従う')
        .replace(/知っています/g, '知っている')
        .replace(/知りません/g, '知らない')
        .replace(/限りません/g, '限らない')
        .replace(/限ります/g, '限る')
        .replace(/きました/g, 'きた')
        .replace(/入りました/g, '入った')
        .replace(/進みました/g, '進んだ')

        .replace(/見えます/g, '見える')
        .replace(/見せます/g, '見せる')
        .replace(/捨てます/g, '捨てる')
        .replace(/食べます/g, '食べる')
        .replace(/書きます/g, '書く')
        .replace(/入れます/g, '入れる')
        .replace(/伝えます/g, '伝える')
        .replace(/経ます/g, '経る')
        .replace(/尋ます/g, '尋ねる')
        .replace(/考えます/g, '考える')
        .replace(/考えます/g, '考える')

        .replace(/していただく/g, 'してもらう')
        .replace(/させていただきます/g, 'させてもらう')
        .replace(/ご覧になる/g, '見る')
        .replace(/ご覧ください/g, '見よ')
        .replace(/ご参照ください/g, '参照せよ')
        .replace(/ご注意ください/g, '注意せよ')
        .replace(/ご確認ください/g, '確認せよ')
        .replace(/お聞かせください/g, '述べよ')
        .replace(/ご連絡ください/g, '連絡せよ')
        .replace(/ご了承ください/g, '了承せよ')
        .replace(/ご説明ください/g, '説明せよ')
        .replace(/お帰りください/g, '帰宅せよ')
        .replace(/ご依頼ください/g, '依頼せよ')
        .replace(/お知らせください/g, '知らせよ')
        .replace(/お問い合わせください/g, '問い合わせよ')
        .replace(/お願いいたします/g, '頼む')
        .replace(/お願いします/g, '頼む')
        .replace(/ご利用いただきます/g, '利用してもらう')
        .replace(/お読みいただきますよう/g, '読むよう')
        .replace(/お読みいただくよう/g, '読むよう')
        .replace(/お読みになり/g, '読み')
        .replace(/頂きます/g, '頂く')
        .replace(/いただきます/g, 'いただく')
        .replace(/いただくこと/g, 'もらうこと')
        .replace(/場合がございます/g, '場合がある')
        .replace(/場合もございます/g, '場合もある')

        .replace(/につきましては/g, 'は')
        .replace(/におかれては/g, 'は')
        .replace(/におかれましては/g, 'は')
        .replace(/ついては/g, 'は')
        .replace(/ですから/g, 'つまり')
        .replace(/ですが、/g, 'だ。しかし、')
        .replace(/でした/g, 'だ')
        .replace(/おきましょう/g, 'おく')
        .replace(/あるでしょう/g, 'あるだろう')
        .replace(/しましょう/g, 'しよう')
        .replace(/できません/g, 'できない')
        .replace(/しますが、/g, 'する。しかし、')
        .replace(/しますが/g, 'するが')
        .replace(/していきましょう/g, 'していこう')
        .replace(/していません/g, 'していない')

        .replace(/ようです/g, 'ようだ')
        .replace(/ようでしょう/g, 'ようだろう')
        .replace(/ようでした/g, 'ようだった')
        .replace(/そうです/g, 'そうだ')
        .replace(/そうでしょう/g, 'そうだろう')
        .replace(/そうでした/g, 'そうだった')

        .replace(/しております/g, 'している')
        .replace(/してきます/g, 'してくる')
        .replace(/させていただいた/g, 'した')
        .replace(/構いません/g, '構わない')
        .replace(/かまいません/g, 'かまわない')

        .replace(/ご住所/g, '住所')
        .replace(/ご注文/g, '注文')
        .replace(/ご連絡/g, '連絡')
        .replace(/ご報告/g, '報告')
        .replace(/ご説明/g, '説明')
        .replace(/ご利用/g, '利用')
        .replace(/ご請求/g, '請求')
        .replace(/お客様/g, '客')

        .replace(/されませんが、/g, 'されない。しかし、')
        .replace(/されませんが/g, 'されないが')
        .replace(/されません/g, 'されない')
        .replace(/されているのです/g, 'されている')

        .replace(/してください/g, 'せよ')
        .replace(/しましたが、/g, 'した。しかし、')
        .replace(/しましたが/g, 'したが')
        .replace(/しました/g, 'した')

        .replace(/しまいましたが、/g, 'しまった。しかし、')
        .replace(/しまいましたが/g, 'しまったが')
        .replace(/しまいました/g, 'しまった')

        .replace(/なりましたが/g, 'なったが')
        .replace(/ましたが、/g, 'た。しかし、')
        .replace(/ましたが/g, 'したが')

        .replace(/ますが、/g, 'る。しかし、')
        .replace(/ですけど/g, 'だが')
        .replace(/ですが/g, 'だが')
        .replace(/ますが/g, 'るが')

        .replace(/したいです/g, 'したい')
        .replace(/たいです/g, 'たい')

        .replace(/しれませんが、/g, 'しれない。しかし、')
        .replace(/しれませんが/g, 'しれないが')
        .replace(/しましたね/g, 'した')

        .replace(/やりましたね/g, 'やった')
        .replace(/ということです/g, 'ことだ')
        .replace(/ことです/g, 'ことだ')

        .replace(/ください/g, 'ほしい')
        .replace(/ておきます/g, 'ておく')
        .replace(/いますか/g, 'いるだろうか')
        .replace(/ますか/g, 'いるのだろうか')
        .replace(/でしょう/g, 'だろう')

        .replace(/ありがとうございました/g, 'ありがとう')
        .replace(/ありがとうございます/g, 'ありがとう')
        .replace(/おはようございます/g, 'おはよう')
        .replace(/よろしく/g, '')
        .replace(/いたします/g, 'する')

        .replace(/います/g, 'いる')
        .replace(/いました/g, 'いた')
        .replace(/なりません/g, 'ならない')
        .replace(/します/g, 'する')
        .replace(/させました/g, 'させた')

        .replace(/なりました/g, 'なった')
        .replace(/ありません/g, 'ない')
        .replace(/しいです。/g, 'しい。')
        .replace(/のです。/g, 'のだ。')
        .replace(/いです。/g, 'い。')

        .replace(/てみました/g, 'てみた')
        .replace(/でしょうか/g, 'だろうか')

        .replace(/いるのです/g, 'いるのだ')
        .replace(/いるのでした/g, 'いるのだった')
        .replace(/られました/g, 'られた')

        .replace(/なんです/g, 'だ')
        .replace(/ますよね/g, 'るだろう')
        .replace(/んですよね/g, '')
        .replace(/うですよね/g, 'うだろう')
        .replace(/うですね/g, 'うだ')
        .replace(/ですね/g, '')
        .replace(/でした/g, 'だった')

        .replace(/ません/g, 'ない')
        .replace(/います/g, 'いる')
        .replace(/られます/g, 'られる')
        .replace(/ります/g, 'る')
        .replace(/ます。/g, 'る。')
        .replace(/です。/g, 'だ。')
        .replace(/です/g, '')

    return text;
};

//敬体を常体にする関数
function BuzzWord(text) {
    //テキストを置換する
    text = text
        .replace(/ソーシャルネットワークサービス/g, "SNS")
        .replace(/ジャスト.インフォメーション/g, "情報")
        .replace(/グローバル.スタンダード/g, "世界標準")
        .replace(/ダイナミックプライシング/g, "変動料金制")
        .replace(/デファクト・スタンダード/g, "事実上の標準")
        .replace(/コストパフォーマンス /g, "費用対効果")
        .replace(/スクラップアンドビルド/g, "破壊と再生")
        .replace(/デファクトスタンダード/g, "事実上の標準")
        .replace(/コンティンジェンシー/g, "偶然性")
        .replace(/ブランド・エクイティ/g, "資産の集合体")
        .replace(/エクスクルージョン/g, "排除")
        .replace(/ジャスト.アイデア/g, "思いつき")
        .replace(/ダイバーシティー /g, "多様性")
        .replace(/ベストプラクティス/g, "「最も効率のよい手法」")
        .replace(/パラダイム.シフト/g, "常識の大変革")
        .replace(/アウトソーシング/g, "外注")
        .replace(/アクセシビリティ/g, "利用のしやすさ")
        .replace(/インタラクティブ/g, "双方向")
        .replace(/インテリジェンス/g, "知性")
        .replace(/インフルエンサー/g, "影響力のある人")
        .replace(/エスカレーション/g, "引き継ぎ")
        .replace(/コアコンピタンス/g, "強み")
        .replace(/コンプライアンス/g, "規則")
        .replace(/サードパーティー/g, "第三者")
        .replace(/サステナビリティ/g, "持続可能性")
        .replace(/パラダイムシフト/g, "常識の大変革")
        .replace(/ジャストアイデア/g, "思いつき")
        .replace(/シンギュラリティ/g, "技術的特異点")
        .replace(/ステークホルダー/g, "利害関係者")
        .replace(/データマイニング/g, "情報分析")
        .replace(/ニアリーイコール/g, "ほぼ同じ")
        .replace(/ネゴシエーション/g, "交渉")
        .replace(/ユーティリティー/g, "便利なもの")
        .replace(/レギュレーション/g, "規約")
        .replace(/マーケティング/g, "販売戦略")
        .replace(/イノベーティブ/g, "革新的")
        .replace(/アウトバウンド/g, "外向き")
        .replace(/イテレーション/g, "反復")
        .replace(/イノベーション/g, "技術革新")
        .replace(/インクルーシブ/g, "仲間はずれにしない")
        .replace(/インセンティブ/g, "やりがい")
        .replace(/エクスキューズ/g, "弁明")
        .replace(/オポチュニティ/g, "機会")
        .replace(/オペレーション/g, "運用")
        .replace(/キュレーション/g, "情報まとめ")
        .replace(/コミットメント/g, "関与")
        .replace(/コモディティ化/g, "汎用品化")
        .replace(/コンソーシアム/g, "共同事業体")
        .replace(/コンバージョン/g, "転換")
        .replace(/コンピテンシー/g, "高業績者の行動特性")
        .replace(/ステートメント/g, "声明")
        .replace(/スレッショルド/g, "閾値")
        .replace(/ダイバーシティ/g, "多様性")
        .replace(/ドラスティック/g, "劇的")
        .replace(/パフォーマンス/g, "効率")
        .replace(/フィードバック/g, "評価")
        .replace(/フィジビリティ/g, "実現可能性")
        .replace(/プライオリティ/g, "優先順位")
        .replace(/プログレッシブ/g, "先進的")
        .replace(/フロントエンド/g, "「アプリの見た目」")
        .replace(/マイルストーン/g, "節目")
        .replace(/モチベーション/g, "やる気")
        .replace(/リノベーション/g, "修理")
        .replace(/マネージメント/g, "管理")
        .replace(/マネジメント/g, "管理")
        .replace(/アライアンス/g, "同盟")
        .replace(/アンバサダー/g, "大使")
        .replace(/イニシアチブ/g, "主導権")
        .replace(/イノベーター/g, "改革者")
        .replace(/インバウンド/g, "内向き")
        .replace(/エコシステム/g, "生態系")
        .replace(/オーソライズ/g, "公認")
        .replace(/クライアント/g, "客")
        .replace(/クロージング/g, "終わり")
        .replace(/コミュニティ/g, "界隈")
        .replace(/コンセンサス/g, "合意")
        .replace(/コンテキスト/g, "文脈")
        .replace(/コンテクスト/g, "文脈")
        .replace(/ディシジョン/g, "意思決定")
        .replace(/ディシジョン/g, "決定")
        .replace(/デッドライン/g, "締切")
        .replace(/バックエンド/g, "「アプリの中身で行われる処理部分」")
        .replace(/ハレーション/g, "悪影響")
        .replace(/ハンドリング/g, "舵取り")
        .replace(/フィーチャー/g, "特集")
        .replace(/フルコミット/g, "積極的関与")
        .replace(/ベネフィット/g, "利益")
        .replace(/ペンディング/g, "保留")
        .replace(/ボトルネック/g, "設計上の制約")
        .replace(/ポリバレント/g, "多価")
        .replace(/モノリシック/g, "一枚岩のような")
        .replace(/リスクヘッジ/g, "危険回避")
        .replace(/インパクト/g, "衝撃")
        .replace(/アイディア/g, "アイデア")
        .replace(/アクセプト/g, "受理")
        .replace(/アジェンダ/g, "検討課題")
        .replace(/アジャイル/g, "素早い")
        .replace(/アジャスト/g, "調節")
        .replace(/エビデンス/g, "証拠")
        .replace(/カバレッジ/g, "到達範囲")
        .replace(/カバレッジ/g, "占める割合")
        .replace(/コンセプト/g, "概念")
        .replace(/コンテンツ/g, "商品")
        .replace(/コンパイル/g, "翻訳")
        .replace(/シュリンク/g, "収縮")
        .replace(/スクリプト/g, "台本")
        .replace(/セグメント/g, "分類")
        .replace(/ゼロベース/g, "白紙")
        .replace(/デフォルト/g, "基本的")
        .replace(/ノーティス/g, "お知らせ")
        .replace(/バジェット/g, "予算")
        .replace(/パラダイム/g, "固定概念")
        .replace(/ハンズオン/g, "体験学習")
        .replace(/フィジビリ/g, "実現可能性")
        .replace(/フィックス/g, "確定")
        .replace(/マテリアル/g, "材料")
        .replace(/ミッション/g, "任務")
        .replace(/ユビキタス/g, "遍在")
        .replace(/リテラシー/g, "知識")
        .replace(/ASAP/g, "できるだけ早く")
        .replace(/MECE/g, "モレなく、ダブりなく")
        .replace(/アグリー/g, "合意")
        .replace(/アサイン/g, "割り当て")
        .replace(/イシュー/g, "課題")
        .replace(/オンスケ/g, "予定通り")
        .replace(/キャズム/g, "深い隔たり")
        .replace(/コミット/g, "関与")
        .replace(/サポート/g, "補助")
        .replace(/サンプル/g, "見本")
        .replace(/シナジー/g, "相乗効果")
        .replace(/スキーム/g, "枠組み")
        .replace(/デプロイ/g, "配備")
        .replace(/ドリブン/g, "主導")
        .replace(/トレンド/g, "流行")
        .replace(/なるはや/g, "なるべく早く")
        .replace(/ナレッジ/g, "知識")
        .replace(/ノウハウ/g, "秘訣")
        .replace(/バッファ/g, "余裕")
        .replace(/ファクト/g, "事実")
        .replace(/フェーズ/g, "段階")
        .replace(/ミーシー/g, "モレなく、ダブりなく")
        .replace(/ミッシー/g, "モレなく、ダブりなく")
        .replace(/メソッド/g, "方法")
        .replace(/メディア/g, "媒体")
        .replace(/メンター/g, "先生")
        .replace(/ユーザー/g, "利用者")
        .replace(/ユーザー/g, "使用者")
        .replace(/リソース/g, "資源")
        .replace(/リバイズ/g, "修正")
        .replace(/ルーチン/g, "日課")
        .replace(/レイヤー/g, "層")
        .replace(/2\.0/g, "の新しい形")
        .replace(/FYI/g, "ご参考までに")
        .replace(/IoT/g, "あらゆるものがインターネットに繋がった状態")
        .replace(/KPI/g, "重要業績評価指標")
        .replace(/コスパ/g, "費用対効果")
        .replace(/タイト/g, "きつい")
        .replace(/ツール/g, "道具")
        .replace(/テレコ/g, "互い違い")
        .replace(/ニッチ/g, "隙間")
        .replace(/ノルマ/g, "目標")
        .replace(/マスト/g, "必要")
        .replace(/マター/g, "課題")
        .replace(/マター/g, "担当職務")
        .replace(/モダン/g, "現代的")
        .replace(/リスケ/g, "予定の再変更")
        .replace(/AI/g, "人工知能")
        .replace(/アセット/g, "財産")
        .replace(/VR/g, "仮想現実")
        .replace(/AR/g, "拡張現実")

    return text;
};



//特定の漢字表現をひらがなする関数
function KanjiWord(text) {
    //テキストを置換する
    text = text
        .replace(/我が/g, 'わが')
        .replace(/凡そ/g, 'おおよそ')
        .replace(/及び/g, 'および')
        .replace(/然し/g, 'しかし')
        .replace(/即ち/g, 'すなわち')
        .replace(/何故/g, 'なぜ')
        .replace(/是非/g, 'ぜひ')
        .replace(/段々/g, 'だんだん')
        .replace(/或いは/g, 'あるいは')
        .replace(/予め/g, 'あらかめ')
        .replace(/流石/g, 'さすが')
        .replace(/更に/g, 'さらに')
        .replace(/故に/g, 'ゆえに')
        .replace(/因みに/g, 'ちなみに')
        .replace(/並びに/g, 'ならびに')
        .replace(/却って/g, 'かえって')
        .replace(/直に/g, 'じかに')
        .replace(/等/g, 'など')
        .replace(/程/g, 'ほど')
        .replace(/筈/g, 'はず')
        .replace(/殆ど/g, 'ほとんど')
        .replace(/僅か/g, 'わずか')
        .replace(/迄/g, 'まで')
        .replace(/概ね/g, 'おおむね')
        .replace(/余り/g, 'あまり')
        .replace(/人達/g, '人たち')
        .replace(/一寸/g, 'ちょっと')
        .replace(/但し/g, 'ただし')
        .replace(/敢えて/g, 'あえて')
        .replace(/丁度/g, 'ちょうど')
        .replace(/我が/g, 'わが')
        .replace(/凡そ/g, 'おおよそ')
        .replace(/所謂/g, 'いわゆる')
        .replace(/出来る/g, 'できる')
        .replace(/可笑しい/g, 'おかしい')
        .replace(/由々しい/g, 'ゆゆしい')
        .replace(/有る/g, 'ある')
        .replace(/無い/g, 'ない')

    return text;
};

//カッコの全角半角を修正する関数
function kakkoReplace(text) {

    text = text
        //英数字の全角括弧を半角括弧へ置換する。
        .replace(/\（([0-9a-zA-Z])/g, '\($1')
        .replace(/([0-9a-zA-Z])\）/g, '$1\)')
        //日本語の半角括弧を全角括弧へ置換
        .replace(/\(([\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf])/g, '\（$1')
        .replace(/([\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf])\)/g, '$1\）')

    //全角括弧と半角括弧が混ざった場合、先頭の方に合わせる。
    text = text
        .replace(/\（(.*?)\)/g, '\（$1）')
        .replace(/\((.*?)\）/g, '\($1)')

    return text;
};


function kakkoChange() {
    //テキストエリア内のテキストを取得
    let text = document.getElementById("textarea").value;

    text = kakkoReplace(text);

    //入力されたテキストをサニタイジングする関数
    text = Sanitizing(text);

    //使用に注意が必要な表現を着色する関数
    let { ScoreText, ReviewText, TextData, after_text } = PaintText(text);
    //表示ボックスに書き込む
    document.getElementById("box").innerHTML = after_text;

    //点数を書き込む
    document.getElementById("ScoreBox").innerHTML = `${ScoreText}`;
    document.getElementById("review").innerHTML = `${ReviewText}`;
    document.getElementById("TextData").innerHTML = `${TextData}`;
};

//特定カタカナ英語を日本語にする関数
function BuzzCancel() {

    //テキストエリア内のテキストを取得
    let text = document.getElementById("textarea").value;

    text = BuzzWord(text);

    //入力されたテキストをサニタイジングする関数
    text = Sanitizing(text);

    //使用に注意が必要な表現を着色する関数
    let { ScoreText, ReviewText, TextData, after_text } = PaintText(text);
    //表示ボックスに書き込む
    document.getElementById("box").innerHTML = after_text;

    //点数を書き込む
    document.getElementById("ScoreBox").innerHTML = `${ScoreText}`;
    document.getElementById("review").innerHTML = `${ReviewText}`;
    document.getElementById("TextData").innerHTML = `${TextData}`;
};

//敬体を常体にする関数
function ZyotaiGo() {

    //テキストエリア内のテキストを取得
    let text = document.getElementById("textarea").value;

    text = KeitaiToZyotai(text);

    //入力されたテキストをサニタイジングする関数
    text = Sanitizing(text);

    //使用に注意が必要な表現を着色する関数
    let { ScoreText, ReviewText, TextData, after_text } = PaintText(text);
    //表示ボックスに書き込む
    document.getElementById("box").innerHTML = after_text;

    //点数を書き込む
    document.getElementById("ScoreBox").innerHTML = `${ScoreText}`;
    document.getElementById("review").innerHTML = `${ReviewText}`;
    document.getElementById("TextData").innerHTML = `${TextData}`;
};


//特定の漢字表現を日本語にする関数
function KanjiCancel() {

    //テキストエリア内のテキストを取得
    let text = document.getElementById("textarea").value;

    text = KanjiWord(text);

    //入力されたテキストをサニタイジングする関数
    text = Sanitizing(text);

    //使用に注意が必要な表現を着色する関数
    let { ScoreText, ReviewText, TextData, after_text } = PaintText(text);
    //表示ボックスに書き込む
    document.getElementById("box").innerHTML = after_text;

    //点数を書き込む
    document.getElementById("ScoreBox").innerHTML = `${ScoreText}`;
    document.getElementById("review").innerHTML = `${ReviewText}`;
    document.getElementById("TextData").innerHTML = `${TextData}`;
};

//特定カタカナ英語を日本語にして敬体を常体にする関数
function BuzzKeiteiTranslator() {

    //テキストエリア内のテキストを取得
    let text = document.getElementById("textarea").value;

    text = KanjiWord(text);
    text = BuzzWord(text);
    text = KeitaiToZyotai(text);
    text = kakkoReplace(text);

    //入力されたテキストをサニタイジングする関数
    text = Sanitizing(text);

    //使用に注意が必要な表現を着色する関数
    let { ScoreText, ReviewText, TextData, after_text } = PaintText(text);

    //表示ボックスに書き込む
    document.getElementById("box").innerHTML = after_text;

    //点数を書き込む
    document.getElementById("ScoreBox").innerHTML = `${ScoreText}`;
    document.getElementById("review").innerHTML = `${ReviewText}`;
    document.getElementById("TextData").innerHTML = `${TextData}`;
};


//テキスト変更機能を実行する関数
function TextModification() {
    let TMNumber = Number(document.getElementById("TMNumber").value);

    if (TMNumber === 0) {
        MarkingTextPosting();
    } else if (TMNumber === 1) {
        ZyotaiGo();
    } else if (TMNumber === 2) {
        BuzzCancel();
    } else if (TMNumber === 3) {
        KanjiCancel();
    } else if (TMNumber === 4) {
        kakkoChange();
    } else if (TMNumber === 5) {
        BuzzKeiteiTranslator();
    };
};

function ExampleTextOne() {

    document.getElementById("textarea").innerHTML
        = "みなさんは、暇をつぶしたいというときに何をしますか？\n私は、YouTubeを見たりNetflixを見たりすることも無いわけではありませんし、それらを見ることもよくあるのですが、ウィキペディア(フリー百科事典)の「おまかせ表示」という機能を使って記事を読むこともけっこう好きなんですよ。\nこの「おまかせ表示」は、あの有名なウィキペディアのたくさんの記事の中からランダムな記事を表示してくれるという機能です。\nボタンをクリックするだけで今まで自分が知らなかったような知識に巡り合えるので、リスケで生まれたちょっとした暇を潰す時等のベストプラクティスのひとつだと思います。";
    MarkingTextPosting();
    ButtonInvisible();
};

function ExampleTextButtonAppearance() {
    document.getElementById("ExampleTextButton").innerHTML
        = `<a class="c-button pb-2 m-1" onclick="ExampleTextOne()">試しに"読みにくい例文"を表示する</a>`
};

function ButtonInvisible() {
    //テキストエリア内のテキストを取得
    let text = document.getElementById("textarea").value;
    text = Sanitizing(text);
    let TextLength = text.replace(/<br \/>/g, '').length;

    if (TextLength === 0) {
        document.getElementById("textarea").innerHTML = '';
        document.getElementById("TMMenu").innerHTML = '<br><br><br><br><br><br><br>';
    } else if (TextLength > 1) {
        document.getElementById("ExampleTextButton").innerHTML = ""
        document.getElementById("TMMenu").innerHTML = '<label for="TMNumber" class="box2 col-10 col-xxl-10 mx-3"><select id="TMNumber" class="form-select my-1" aria-label="Default select example" onchange="TextModification()"><option value="0">テキストの自動修正なし</option><option value="1">①常体を敬体にして、少し読みやすくする。(精度はまちまちです。)</option><option value="2">②特定のカタカナ英語を日本語に変換する。(精度はまちまちです。)</option><option value="3">③特定の漢字表現をひらがなにする。</option><option value="4">④英数字の全角括弧と日本語の半角括弧を矯正</option><option value="5">①＋②＋③＋④を同時に実行する</option></select>';
    };
}

//文章が入力・変更されたときに実行する
window.addEventListener('DOMContentLoaded', function () {

    // input要素を取得
    let input_name = document.getElementById("textarea")

    // イベントリスナーでイベント「input」を登録
    input_name.addEventListener("input", function () {
        ButtonInvisible();
        MarkingTextPosting();
    });

    // イベントリスナーでイベント「change」を登録
    input_name.addEventListener("change", function () {
        ButtonInvisible();
        MarkingTextPosting();
    });

});