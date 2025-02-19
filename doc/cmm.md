
     ,linkcolor=blue,urlcolor=blue]{hyperref}  

}

}


{
{minipagetabularcenter
}

{minipage{14.5cm}0.2cmcenter}
{center0.2cmminipage}

{table[#1]center#20.2cmtab:#3}
{centertable}


# プログラミング言語 C-- 


~
Copyright \copyright ~~ 2016 - 2023 by 
Dept. of Computer Science and Electronic Engineering, 
Tokuyama College of Technology, JAPAN


本ドキュメントは＊全くの無保証＊で提供されるものである．上記著作権者および
関連機関・個人は本ドキュメントに関して，その適用可能性も含めて，いかなる保証
も行わない．また，本ドキュメントの利用により直接的または間接的に生じたいかな
る損害に関しても，その責任を負わない．


## 1. はじめに

徳山高専教育用 PC(\tac) のシステム記述用言語として開発されました．
本書はC言語 や Java言語 を学習したことがある人を対象に，

まず，無くても我慢できそうな文法は，思い切り良く省略しています．
例えば，C言語 では多次元配列の形式にいくつかのレパートリーがありました．
しかし，Java言語 にはレパートリーはありません．

また，C言語 の混乱を招きそうな文法仕様を取り入れないように注意しています．
例えば，C言語 の配列は関数に渡されるとポインタとして扱われます．
つまり，関数に渡すと型が変化してしまいます．
このような仕様は，初心者が言語を学習する場合に混乱を招きます．

その他にも，C言語 の難しい文法を取り去る工夫をしてあります．

そのため，無闇に文法を簡単化すること無く，
実用的に使用するために必要な文法は残してあります．
例えば，制御文は{\tt if}，{\tt while}，{\tt for}，{\tt do-while}，
{\tt return}，{\tt break}，{\tt continue} 等が一通り準備されています．

また，なるべく効率の良いオブジェクトコードを出力する努力をしています．

最終的に TaC 上でセルフ開発環境を構築することを目標としています．
そこで，C-- コンパイラは TaC の限られた主記憶(64KiB)で実行できるように
メモリを節約するような設計がされています．
コンパイラのプログラムが小さいこともそうですが，
単一の名前表で変数，関数，
構造体を管理する等してデータ構造も小さくするようにしています．

コンパイラの教材として使用することを想定して開発されました．
そのため，コンパイラがコンパクトに記述でき，
コンパイラのソースコードを学生が読めることも目標になっています．

2016年2月現在の C-- コンパイラは C言語 で5,000行程度で記述されています．
5,000行の内訳は，おおよそ，
字句解析部が500行，構文・意味解析部が1,200行，
中間コード生成部が800行，機械語コード生成部が900行，
名前表管理部が200行，構文木管理部が300行，構文木の最適化部が600行です．
少し根気が必要ですが，各モジュールを順に読んでいくことができます．

また，コンパイラの仕組みを理解する手助けにする目的で，
コンパイラ内部で使用される中間コードを出力することもできます．
中間コードは，
ソースコードからの変換が比較的容易にできる仮想スタックマシンの機械語です．
スタックマシンの機械語を経ることで，
直接TaC の機械語に変換する場合と比較して
コンパイラのアルゴリズムが易しくなっています．


## 2. C-- 言語 開発環境のインストール

使用できるようにしましょう．
{\bf 以下の順番で}作業し，開発環境をインストールしてください．


### 2.1. ユーティリティのインストール

{
{
ソースコードは

ダウンロードした配布物を展開し
「{\tt Util--/doc/umm.pdf）の手順に従いインストールします．
{，{，{
{\tt /usr/local/bin}にインストールされます．

### 2.2. コンパイラのインストール

{
ダウンロードした配布物を展開し以下の順にインストールします．

#### 2.2.1. コンパイラ本体のインストール

{\tt C--/src}ディレクトリに移動し以下のように操作します．

```
$ make
cc -std=c99 -Wall  -DDATE="\"`date`\"" -DVER=\"`cat ../VERSION`\"
...
$ sudo make install
Password:
install -d -m 755 /usr/local/bin
install -m 755 c-- /usr/local/bin
install -m 755 vm-c-- /usr/local/bin
...
```

以上で，{，{，{
{，{の
九つのプログラムが作成され/usr/local/binにインストールされました．
{，{は，
{
これらのシェルスクリプトは，
与えられたファイルの拡張子から処理するべき手順を判断し，
コンパイラやユーティリティを自動的に実行します．

{で実行できる「{\tt .exe}」ファイルに変換します．
{
{
{
{のアセンブリ言語に変換します．
通常{
変換された{
通常{
{
出力したプログラムに実行時エラーチェック機能を組み込みます．
実行時エラーチェックにより，
配列使用時に添字が範囲を超えていた場合に，
それを検出してプログラムが確実に停止します．
通常{
中間言語(app:vmページ)を出力して見せるコンパイラです．
通常{
中間言語(app:vmページ)をよく反映した，
仮想スタックマシンのニーモニックを出力して見せるコンパイラです．
通常{

なお，これら九つのプログラムの使用方法は，
コマンドリファレンス(app:commandページ)で紹介します．

#### 2.2.2. ヘッダファイルのインストール

{

```
$ sudo make install
Password:
install -d -m 755 /usr/local/cmmInclude
rm -f /usr/local/cmmInclude/*.hmm
install -m 644 *.hmm /usr/local/cmmInclude
...
```

#### 2.2.3. ライブラリのインストール


```
$ sudo make install
Password:
...
cm2e -c ../SrcTac/crt0.s
...
install -m 644 libtac.o /usr/local/cmmLib
...
install -m 644 *.[ch]  /usr/local/cmmLib/LibRtc
install -m 644 ../SrcC/cfunc.hmm /usr/local/cmmLib/LibRtc
install -m 644 ../SrcC/wrapper.c /usr/local/cmmLib/LibRtc
...
install -m 644 *.[ch] /usr/local/cmmLib/LibNortc
install -m 644 ../SrcC/cfunc.hmm  /usr/local/cmmLib/LibNortc
install -m 644 ../SrcC/wrapper.c  /usr/local/cmmLib/LibNotc
...
```


トランスレータが実行時エラーチェックを行わない実行形式を作るときに
使用する{
トランスレータが実行時エラーチェックを行う実行形式を作るときに
使用する{

### 2.3. サンプルプログラムのコンパイル

{\tt hello.cmm}プログラムが準備してあります．
これをコンパイルして実行してみましょう．
{\tt hello.cmm}プログラムは以下のような{

```
//
// hello.cmm : C--のサンプルプログラム
//
#include <stdio.hmm>

public int main() {
  printf("hello,world\n");
  return 0;
}
```

#### 2.3.1. コンパイルしてPCで実行

{\tt hello.cmm}プログラムをコンパイルしてPCで実行することができます．
なお，{chap2:compilerl コンパイラのインストール」で
インストールしたシェルスクリプトです．
コンパイラとユーティリティを自動的に起動して，
{

```
$ cm2c -o hello hello.cmm 
$ ./hello
hello,world
```

#### 2.3.2. コンパイルしてTaCで実行

{\tt hello.cmm}プログラムをコンパイルして{
{\tt hello.exe}を作ることができます．
なお，{chap2:compilerl コンパイラのインストール」で
インストールしたシェルスクリプトです．
コンパイラとユーティリティを自動的に起動して，
{で実行可能なプログラムに変換します．
{\tt hello.exe}をメモリカードにコピーすると{

```
$ cm2e -o hello hello.cmm 
$ ls -l
...
-rw-r--r--  1 sigemura  staff   138 May  5 01:03 hello.cmm
-rw-r--r--  1 sigemura  staff  8164 May 28 23:28 hello.exe
-rw-r--r--  1 sigemura  staff  5862 May 28 23:28 hello.map
```

#### 2.3.3. いろいろな中間ファイル

上の例で示した他に，{\tt hello.cmm}から数種類のファイルを作ることができます．


{\tt -Sオプション付きで実行して
{\tt hello.cmm}を変換した{
「$ cm2c -S hello.cmm」のように実行します．
上記の{\tt hello}は，これを{

```
#include <stdio.h>
#define _cmm_0S "hello,world\n"
int main(){
_printf(_cmm_0S);
return 0;
}
```

{\tt -Sオプション付きで実行して
{\tt hello.cmm}を変換した{
「$ cm2e -S hello.cmm」のように実行します．
上記の{\tt hello.exe}は，
このファイルから{\tt Util--)を
用いて作成されました．

```
_stdin  WS      1
_stdout WS      1
_stderr WS      1
.L1     STRING  "hello,world\n"
_main   PUSH    FP
        LD      FP,SP
        CALL    __stkChk
        LD      G0,#.L1
        PUSH    G0
        CALL    _printf
        ADD     SP,#2
        LD      G0,#0
        POP     FP
        RET
```

中間言語に変換したプログラムです．
「$ cm2i hello.cmm」のように実行します．
中間言語の詳細は，

```
vmNam(25)
vmWs(1)
vmNam(26)
vmWs(1)
vmNam(27)
vmWs(1)
vmLab(1)
vmStr("hello,world\n")
vmNam(72)
vmEntry(0)
vmLdLab(1)
vmArg()
vmCallF(1, 69)
vmPop()
vmLdCns(0)
vmMReg()
vmRet()
```

仮想スタックマシンのニーモニックに変換したプログラムです．
中間言語とニーモニックは一対一に対応しています．
「$ cm2v hello.cmm」のように実行します．
仮想スタックマシンのニーモニックの詳細は，

```
_stdin
        WS      1
_stdout
        WS      1
_stderr
        WS      1
.L1
        STRING  "hello,world\n"
_main
        ENTRY   0
        LDC     .L1
        ARG
        CALLF   1,_printf
        POP
        LDC     0
        MREG
        RET
```

#### 2.3.4. Makefileファイル

{\tt Makefile}は，
コンパイル手順を記述したファイルです．
数種類の例を示しますので参考にしてください．
なお，コマンド（em2eとrm）左の空白にはTABを用います．

```
#
# Makefile.tac : C--言語からTacの実行形式に変換する手順
#

hello.exe: hello.cmm
        cm2e -o hello hello.cmm

clean:
        rm -f hello.exe hello.map
```

```
#
# Makefile.unix : C--言語からmacOSやUNIXの実行形式に変換する手順
#

hello: hello.cmm
        cm2c -o hello hello.cmm

clean:
        rm -f hello
```

```
#
# C-- 言語から a.out，.exe， .v ファイルを作る手順
#

all: hello hello.exe hello.v

# UNIX, macOS の a.out へ変換
hello: hello.cmm
        cm2c -o hello hello.cmm

# TacOS の実行形式を作る
hello.exe: hello.cmm
        cm2e -o hello.exe hello.cmm

# C--コンパイラの中間言語に変換する
hello.v: hello.cmm
        cm2v hello.cmm

clean:
        rm -f hello hello.c hello.s hello.v *.lst *.sym *.map \
	*.o *.exe *~

```

## 3. C-- 言語 の仕様

システム記述言語として実績のある C言語 を参考にC-- 言語 は設計されました．
しかし，C言語 は設計が古く分かりにくい仕様が多い言語でもあります．
そこで，設計が割と新しい Java言語 を参考に C言語 の問題点を避けるようにしました．
最終的に C-- 言語 は，
{\bf 「Java言語 の特徴を取り入れた簡易\cl」} になりました．

### 3.1. コメント

一つは /* 〜 */ 形式のコメント，
もう一つは // 〜 行末 形式のコメントです．
以下に例を示します．
コメントは，空白を挿入できるところならどこにでも書くことができます．

```
/*
 *  コメントの例を示すプログラム
 */
#include <stdio.hmm>             // printf を使用するために必要

public int main( /* 引数なし */ ) {
  printf("%d\n",10);
  return 0;                      // main は int 型なので
}
```

### 3.2. プリプロセッサ

通常 C-- コンパイラは C言語 用のプリプロセッサと組み合わせて使用します．
前の章で紹介した{，{は，
自動的にプリプロセッサを起動して{
プリプロセッサのお陰で，

受け取った入力の，ヘッダファイル内部に相当する部分にエラーを見つけた場合でも，
正しくエラー場所をレポートできます．
また，C言語 を出力するトランスレータとして動作する場合は，
出力した C言語 プログラム中に適切な#includeディレクティブを出力したり，
ヘッダファイル内部を省略して出力する等の処理をしています
．

### 3.3. データ型

基本型には， int 型， char 型， boolean 型の3種類があります．
参照型には「配列型」，「構造体型」，「だまし型」があります．
参照型は Java言語 の参照型と良く似た型です．

#### 3.3.1. 基本型

int 型は整数値の表現に使用します．
char 型は文字の表現に使用します．
boolean 型は true と false のどちらかの値を取る論理型です．
違う型の間での代入はできません．
char 型から int 型だけ自動的な型変換を行いますが，
他の組合せでは自動的な型変換を行いません．

##### 3.3.1.1. int 型
int型は16bit 符号付き2の補数表現2進数です．
(トランスレータ版ではC言語 の int 型に置き換えますのでCコンパイラに依存しますが，
{\cl}の int 型が32ビット，long 型が64ビットだと想定しています．
それ以外の環境ではテストしていません．)
-32768 から 32767 までの範囲の数値を表現することができます．
int 型変数は次のように宣言します．

```
// int 型変数を宣言した例
int a;                       // int 型のグローバル変数
int b = 10;                  // 初期化もできる
public int main() {
  int c;                     // ローカル変数
  int d = 20;                // 初期化もできる
  return 0;
}
```

int 型の定数は，
上のプログラム例にあるように 「10」，「20」と書きます．
また，16進数，8進数で書くこともできます．上の例と同じ値を，
16進数では「0xa」，「0x14」のように，
8進数では「012」，「024」のように書きます．
int 型は，四則演算，ビット毎の論理演算，シフト演算，比較演算等の
計算に使用できます．

##### 3.3.1.2. char 型
char 型は 8bit の ASCII コードを格納するデータ型です．
char 型から int 型へは自動型変換ができます．
情報が失われる可能性がある int 型から char 型への型変換は
「chr演算子」を用いて明示的に行う必要があります．
char 型に適用することができる計算は同値比較だけです．
他の演算は int 型へ自動型変換が行われた後に，
int 型の演算が実行されます．
「chr演算子」，「ord演算子」を用いた明示的な型変換により，
char 型の文字と int 型の ASCII コードの間で相互変換ができます
「ord演算子」が使用できます．}．

```
// char 型変数を宣言した例
char a;                      // char 型のグローバル変数
char b = 'A';                // 初期化もできる
public int main() {
  char c;                    // ローカル変数
  char d = 'D';              // 初期化もできる
  int  i = ord(b);           // char 型から int 型への明示的な型変換
  i = 'a';                   // char 型から int 型への自動的な型変換
  c = chr(i);                // int 型から char 型へは明示的な型変換だけ可能
  c = chr(c + 0x20);         // c + 0x20 の結果は int 型
  return 0;
}
```

char 型の定数は，
上のプログラム例にあるように 「'A'」，「'D'」と書きます．
制御文字を表現するためにchap3:escapeの
エスケープ文字が用意されています．


##### 3.3.1.3. boolean型

そのため，条件式を書かなければならないところに間違って代入式を書いたミスを
発見できず苦労することがよくありました．
このようなミスをコンパイラが発見できます．

```
// C言語でよくある条件式と代入式の書き間違え
if (a=1) {
  ...
}
```

boolean 型は論理演算と同値比較演算のオペランドになることができます．
boolean 型の定数値は，true，false と書き表します
．
boolean 型も int 型と互換性がありません．
「bool演算子」，「ord演算子」に
よる明示的な型変換を用いると int 型との変換が可能です．

次に boolean 型の変数を宣言して使用する例を示します．

```
// boolean 型の使用例
boolean b = true;     // true は定数

public int main() {
  boolean c = x==10;  // 比較演算の結果は boolean 型
  b = b && c;         // 論理演算の結果も boolean 型
  if (b) {            // 論理値なので条件として使用できる
    b = false;        // false も定数
    ...
  }
  int i = ord(b);     // boolean 型から内部表現への変換
  b = bool(i);        // 内部表現から boolean 型への変換
  ...
}
```

#### 3.3.2. 参照型

参照型は C言語 のポインターに似た型です．
参照型には「配列型」，「構造体型」，「だまし型」があります．
参照型の値はインスタンスのアドレスです．
参照型の特別な値として何も指していない状態を表す null があります．
ここでは，配列，多次元配列，文字列， void 配列，
構造体，だまし型について解説します．

##### 3.3.2.1. 配列
配列は「型名[]」と宣言します．
例えば，int型やchar型の配列(参照変数)は次のように宣言します．

```
// 配列の参照変数を宣言した例
int[] a;
char[] b;
```


上の宣言では，参照変数が生成されるだけです．
配列として使用するためには次の例のように
「array」や「iMalloc
char型配列を割り付けるcMalloc，
boolean型配列を割り付けるbMalloc，
参照型配列を割り付けるrMallocも使用できます．
}」等を用いて
配列インスタンスを割り付ける必要があります．
「array」は，配列インスタンスを静的に割り付けます．
「array」は，関数の外で宣言される配列だけで使用できます．
「iMalloc」は，配列インスタンスを実行時に動的にヒープ領域に割り付けます．
「iMalloc」で割り付けた領域は，
使用後「free」によって解放する必要があります．

```
// 配列インスタンスを割り付ける例
int[] a, b = array(10);      // 要素数10のint配列領域を割り付ける
public int main() {
  a = iMalloc(5);            // 要素数5のint配列領域を割り付ける
  ...
  free(a);                   // iMalloc した領域は忘れず解放する
  return 0;
}
```

配列は次のようなプログラムでアクセスできます．
添字は 0 から始まります．

```
// 配列をアクセスする例
b[9] = 1;
a[0] = b[9] + 1;
```

トランスレータ版では，
実行時の添字範囲チェックがされます．
添字範囲エラーを検知した場合の実行例を次に示します．

```
# トランスレータ版で配列の添字範囲エラーを検知した場合の実行例
$ cat err.cmm
#include <stdio.hmm>
int[] a = array(3);
public int main() {
  for (int i=0; i<=3; i=i+1)  // ループの実行回数が多すぎる
    a[i] = i;                 // ここでエラーが発生するはず
  return 0;
}
$ cm2c -o err err.cmm
$ ./err
err.cmm:5 Out of Bound idx=3
Abort trap: 6
```

##### 3.3.2.2. 多次元配列

多次元配列は配列の配列として表現されます．
1次元配列の参照を要素とした配列を使うと2次元配列になります．
下に，2次元配列を使用するプログラム例を示します．
プログラム中の a2 は，rMallocとiMalloc によって，
「rMalloc」と「iMalloc」等を使用する場合はプログラムが複雑になってしまいますが，
長方形ではない配列も実現できます．
プログラム中 b2 は，「array」を使用して
多次元配列に必要な配列インスタンスを割り付けた例です．
このように「array」を使用すると，
多次元配列に必要な複雑なデータ構造を簡単に割り付けることができます．



```
// 2次元配列の例
int[][] a2, b2 = array(4,3);       // 2次元配列の領域を割り付ける
public int main() {
  a2 = rMalloc(4);                 // 参照の配列を割り付ける
  for (int i=0; i<4; i=i+1) {
    a2[i] = iMalloc(3);            // int 型の1次元配列を割り付ける
  }
  ...
  for (int i=0; i<4; i=i+1) {
    free(a2[i]);                   // int 型の1次元配列を解放
  }
  free(a2);                        // 参照の配列を解放
  return 0;
}
```

次のプログラムは多次元配列をアクセスする例です．
このプログラムは，chap3:array2の右下の要素
(最後の要素)に 1 を代入したあと，
それを使用して b2 の要素の値を決めます．

```
  a2[3][2] = 1;
  b2[3][2] = a2[3][2] + 1;
```

##### 3.3.2.3. 文字列

文字列は，文字コード 0x00 の文字で終端されます．
次のプログラム例のように文字列定数を用いることができ，
また，文字列の終端を '\0' との比較で判断できます．

```
// 文字列の使用例
char[] str = "0123456789";
void putstr() {
  for (int i=0; str[i]!='\0'; i=i+1) {  // 文字列の終端まで
    putchar(str[i]);                    // 一文字づつ出力
  }
}
```

##### 3.3.2.4.  void 配列

しかし，次のプログラム例のように void 型配列を用いることにより，
異なる参照型の間で代入ができます．
また， malloc 関数や free 関数は，

```
// 型変換の例
struct ABC { int a,b,c; };
struct XYZ { int x,y,z; };
ABC p = { 1, 2, 3 };

void putXYZ(XYZ r) {           // XYZ構造体を印刷する関数
  printf("(%d,%d,%d)\n",r.x,r.y,r.z);
}

public int main() {
  void[] tmp = p;              // tmpにABC参照型を代入可能
  XYZ q = tmp;                 // XYZ参照型にtmpを代入可能
  putXYZ(q);
  return 0;
}
```

##### 3.3.2.5. 構造体

構造体は次のプログラム例のように宣言します．
この例は双方向リストを構成するための Node 型を宣言しています．
構造体名が型名になる点と，
構造体が参照型である点が異なります．

```
struct Node {
  Nodo next;    // 自身と同じ型を参照
  Nodo prev;    // 自身と同じ型を参照
  int  val;     // ノードのデータ
};
```

構造体名が型名になるので struct を書かずに変数宣言します．
構造体メンバは，「参照.メンバ名」形式で参照します．

```
public int main() {
  Node start;                         // 双方向リストのルート
  start = malloc(sizeof(Node));       // 番兵をリストに投げ込む
  start.next = start;                 // 番兵を初期化する
  start.prev = start;
  start.val  = 0;
  ...
}
```

##### 3.3.2.6. だまし型

内容不明のまま参照型を宣言できます．
他の言語で記述された関数を呼び出す場合など，
単に参照型として扱うだけで十分な場合があります．
以下に使用例を示します．

```
typedef FILE;              // FILE 型（だまし型）を宣言する

void f() {
  FILE fp = fopen(...);    // C言語の関数を呼び出す
  fputc('a', fp);          // C言語の関数を呼び出す
  ...
}
```

##### 3.3.2.7. long 型の代用

int の2倍のビット数の符号なし整数型を
int 型の大きさ2の配列で表現し long 型の代用とします．
{

```
int[] a = {12345, 6789};   // long 型の代用
```



### 3.4. 関数
つまり，先に宣言された関数しか呼び出すことができませんし，
引数の個数や型が完全に一致しないとコンパイル時エラーになります．
ライブラリ関数を使用する場合は，
呼び出す前に必ずプロトタイプ宣言をするか，
適切なヘッダファイルをインクルードする必要があります．
また，関数の型を省略することができません．
値を返さない関数は void，
整数を返す関数は int，
論理値を返す関数は boolean 等と明示する必要があります．

可変個引数の関数を宣言することもできます．
可変個引数関数の仮引数は「...」と書きます．
可変個引数関数の内部では，
可変個引数関数を定義することができません．}．
次にプログラム例を示します．

```
#include <stdio.hmm>       // printf のプロトタイプ宣言が含まれる
int f() {                  // 引数の無い関数
  return 1;                // void 型以外の関数は必ずreturnが必要
}

void g(int x) {
  x = x * x;               // 仮引数は変数のように使用できる
  printf("%04x\n", x);     // プロトタイプ宣言が必要
}

public int main() {
  int x = f();             // 関数の呼び出し
  g(x);                    // 引数の型と個数が一致する必要がある
  return 0;                // void 型以外の関数は必ずreturnが必要
}
```

### 3.5. interrupt関数
interrupt 関数は，OSカーネル等の割込みハンドラを
で記述するために用意しました．
コンパイラに-Kオプションを与えないと使用できません．

interrupt 関数はCPUのコンテキスト(フラグ，レジスタ等)を全く破壊しません．
関数の入口でコンテキストをスタックに保存し，出口で復旧します．
割込みにより起動される関数なので，
プログラムから呼び出すことはできません．
仮引数を宣言することもできません．
次の例のように関数型の代わりに interrupt と書きます．
例中の main 関数のように，
addrof 演算子(chap3:addrofページ参照)や
割込みベクタに interrupt 関数を登録します．

```
interrupt timerHdr() {         // タイマー割込みハンドラのつもり
  ...
}
public int main() {
  int[] vect = _iToA(0xffe0);  // vect は割込みベクタの配列
  vect[1] = addrof(timerHdr);  // vect[1] はTimer1の割込みベクタ
  ...
}
```

### 3.6. 変数

関数の外部で宣言した変数は全て静的な大域変数になります．
逆に，関数の内部で宣言した変数は
全てブロック内でローカルな自動変数になります．
関数の内部では，どこでも変数宣言が可能です．
ローカル変数の有効範囲はブロックの終わりまでです．
同じ名前の変数があった場合はローカル変数が優先されます．
ローカル変数同士の名前の重複は認めません(Java言語 と同じ規則，C言語 と異なる)．
次にプログラム例を示します．

```
#include <stdio.hmm>
int   n = 10;                 // 静的な変数
int[] a = array(10);          // 静的な配列
public int main() {
  int i;                      // 関数内ローカル変数
  for (i=0;i<n;i=i+1) {       // 大域変数 n のこと
    int j = i * i;            // ブロック内ローカル変数
    printf("%d\n",j);
    int n = j * j;            // どこでも変数宣言可能
    printf("%d %d\n",j,n);    // ローカルな n のこと
  }                        
  printf("%d\n",n);           // 大域変数 n のこと
  return 0;
}
```

### 3.7. 変数の初期化

基本型の変数は，いつでも宣言と同時に初期化することができます．
参照型の変数は静的に割り付けられる場合だけ初期化できます．
構造体内部に入れ子になった参照型はnullで初期化することしかできません．
ただし名前表のようなデータ構造を作るために，
文字列での初期化だけは可能にしてあります．

```
int     n = 10;                             // 基本型変数の初期化
int[]   a = { 1, 2, 3 };                    // 基本型配列の初期化
int[][] b = {{1,2,0},{1,2,3,0}};            // いびつな配列の初期化
struct List { int  val; List next; };       // 構造体の宣言
List    r = { 1, null };                    // 構造体変数の初期化
struct NameEntry { char[] name, int val; };
NameEntry[] weekTable = {                   // 名前表を作成する例
  {"Sun", 1}, {"Mon", 2}, {"Tue", 3}
};
public int main() {
  int i = 10;                               // 自動変数の初期化
  return 0;
}
```

### 3.8. public 修飾子

関数，大域変数を他のコンパイル単位から参照できるようにします．
他のコンパイル単位からは見えないので，
重複を心配しないで自由に名前を付けることができます．
main関数はスタートアップルーチンから呼び出されるので，
必ずpublic修飾をしなければなりません．

```
int        n = 10;            // 同じ .cmm ファイル内だけで参照可
public int m = 20;            // 他の .cmm ファイルからも参照可

void f() { ... }              // 同じ .cmm ファイル内だけで参照可
public void g() { ... }       // 他の .cmm ファイルからも参照可

public void printf(char[] s, ...);  // ライブラリ関数は public

public int main() {          // main は必ず public
  f();
  g();
  printf("\n");
  return 0;
}
```

### 3.9. 演算子

しかし，コンパイラを小さくする目的で，
レパートリーの多い代入演算子，
前置後置等の組合せが複雑なインクリメント演算子とデクリメント演算子を
省略しました．

#### 3.9.1. 代入演算

1種類だけにしました．

これは，コンパイル時になるべく多くのバグを発見するための仕様です．
参照型の場合も型が厳密に一致している必要があります．
ただし，void[] だけ例外的にどの参照型とも代入可能です．
自動的な型変換はありません．

```
int     a;
boolean b = true;
char    c;
struct X { int r; };
struct Y { int r; };
a = 10;            // 同じ型なので代入可能
c = a;             // （エラー）型が異なるので代入できない
a = b;             // （エラー）型が異なるので代入できない
int i = a = 9;     // 代入演算(a=9)の結果は代入した値(9)
                   // 代入演算の結果(9)を i に代入する
X x = { 1 };
Y y;
y = x;             // （エラー）型が異なるので代入できない
void[] p = x;      // void[] にはどんな参照型も代入可能
y = p;             // void[] はどんな参照型にも代入可能
```

#### 3.9.2. 数値演算

int 型データの計算に，2項演算子の
「+」(和)，
「-」(差)，
「*」(積)，
「/」(商)，
「
が使用できます．
その他に，単項演算子
「+」，
「-」が使用できます．
演算子の優先順位は数学と同じです．
計算(数値演算)をして，計算結果を変数に代入(代入演算)する例を次に示します．

```
x = -10 + 3 * 2;
```

#### 3.9.3. 比較演算

{\bf (1)整数型の大小比較と同値の判定}，
{\bf (2)参照型，文字型，論理型の同値の判定}ができます．
大小比較の演算子は，
「>」(より大きい)，
「>=」(以上)，
「<」(未満)，
「<=」(以下) の4種類です．
同値を判定する演算子は，
「==」(等しい)，
「!=」(異なる)
の2種類です．
比較演算の結果は論理型です．
比較演算の結果を論理型変数に代入することができます．
論理型は if 文や while 文などの条件に使用できます．
次に，比較演算の例を示します．

```
int x = 11;
boolean b;
b = x > 10;              // 整数の大小比較
if (b==false) { ... }    // 論理型の同値判定
```

#### 3.9.4. 論理演算

論理型のデータを対象にした演算です．
演算結果も論理型になります．
単項演算子「!」(否定)，
2項演算子
「&&」(論理積)，
「verb//」(論理和)が使用できます．
次に，論理演算の例を示します．
論理型変数 b に比較結果を求めた後で，

```
int x = 11;
boolean b;
b = 10 <= x && x <= 20;  // (10<=x) と (x<=20) の論理積を b に代入
if (!b) { ... }          // 論理値の否定
```

#### 3.9.5. ビット毎の論理演算

整数値を対象にした演算です．
演算結果も整数値になります．
単項演算子「~」(全ビットを反転)，
2項演算子
「&」(ビット毎の論理積)，
「
「^」(ビット毎の排他的論理和)が使用できます．
次に，ビット毎の論理演算の例を示します．
マスクを使用して，変数 x の下位8ビットを取り出して表示します．
ビット毎の論理演算をしています．

```
int x   = 0xabcd;
int msk = 0x00ff;
printf("%x", x & msk);
```

#### 3.9.6. シフト演算

整数値を対象にした演算です．
演算結果も整数値になります．
2項演算子
「>>」(右算術シフト)，
「<<」(左算術シフト)が使用できます．
算術シフトしかありません．
次に，シフト演算の例を示します．
シフト演算とマスクを使用して，
変数 x の値の上位8ビットを取り出して表示します．
算術シフトですから，マスクを忘れないように注意する必要があります．

```
int x   = 0xabcd;
printf("%x", x >> 8 & 0x00ff);
```

#### 3.9.7. 参照演算

配列要素と構造体メンバをアクセスするための「[ 添字式 ]」や「.」は，
参照を対象にする演算子と考えることができます．
「[ 添字式 ]」演算子は，配列参照と添字式から配列要素を求めます．
「.」演算子は，構造体参照とメンバ名からメンバを求めます．
配列の配列である多次元配列のアクセスは，
「[ 添字式 ]」演算子により取り出した配列要素が配列参照なので，
更に「[ 添字式 ]」演算子により次の配列要素を取り出すと考えます．
実際，C-- コンパイラの内部でもそのように考えて扱っています．
次に多次元配列や構造体を使用したプログラムの例を示します．
「chap3:ref 参照型」に示したプログラム例も参考にしてください．

```
// 多次元配列は配列参照の配列と考える
int[][] a = {{1,2},{3,4}};        // 2次元配列を作る
void f() {
  int[] b = a[0];                 // 2次元配列の要素は1次元配列
  int   c = b[1];                 // 1次元配列の要素は int 型
  int   d = a[0][1];              // c と d は同じ結果になる
}

// 構造体リスト例
struct List {                     // リスト構造のノード型
  List next;                      // 次のノードの参照
  int  val;                       // ノードの値
};
List a;                           // リストのルートを作る

void g() {
  a = malloc(sizeof(List));       // リストの先頭ノードを作る
  a.val  = 1;
  a.next = malloc(sizeof(List));  // リストの2番目ノードを作る
  a.next.val  = 2;
  a.next.next = null;             // 2番目ノードは参照の参照
}
```

#### 3.9.8. sizeof 演算

変数のサイズを知るための演算子です．
「sizeof(型)」のように使用します．
型が基本型の場合は「変数の領域サイズ」，
構造体の場合は「インスタンスの領域サイズ」をバイト単位で返します．
型が配列型の場合は，何型の配列かとは関係なく「参照の領域サイズ
（アドレスのバイト数）」を返します．
通常，参照の領域サイズは「sizeof(void[])」と書きます．
以下に使用例を示します．

```
// sizeof 演算子の使用例
int a = sizeof(int);                // int のサイズ（TaC版で 2）
int b = sizeof(char);               // charのサイズ（TaC版で 1）
int c = sizeof(boolean);            // booleanのサイズ（TaC版で 1）
int d = sizeof(void[]);             // 参照のサイズ（TaC版で 2）
struct X { int x; int y; };
int e = sizeof(X);                  // 構造体Xのサイズ（TaC版で 4）
X[] f = rMalloc(3);                 // 大きさ3の参照配列を準備
f[0] = malloc(sizeof(X));           // 構造体インスタンスを割当
f[1] = malloc(sizeof(X));
f[2] = malloc(sizeof(X));
```

#### 3.9.9. addrof 演算

関数や大域変数のアドレスを知るための演算子です．
「addrof(大域名)」のように使用し整数型の値を返します．
配列や構造体の要素や，関数のローカル変数のアドレスを求めることはできません．

#### 3.9.10. ord 演算

char型，boolean型の値をint型に変換します．
char型の場合は文字の ASCII コード，
boolean型の場合はtrue=1，false=0となります．
なお，v3.4.0以降のコンパイラでは，
char型からint型へは自動的な型変換が可能になり
char型を引数にするord演算子は不要になりましたが，
以前のバージョンとの互換性のために機能を残してあります．

#### 3.9.11. chr 演算

int型の ASCII コードから，char型の文字に変換します．

#### 3.9.12. bool 演算

int型の1，0から，boolean型の論理値に変換します．

以下に，ord，chr，bool 演算子の使用例を示します．

```
// ord(), chr(), bool()演算子の使用例
int i = 0x41;        // 'A'のASCIIコード
char c = chr(i);     // cに，文字'A'が代入される
c = chr(ord(c)+1);   // cに，文字'B'が代入される
i = ord(true);       // i は 1 になる
boolean b = bool(1); // b は true になる
```

#### 3.9.13. カンマ演算
複数の式を接続して文法上一つの式にします．
例えば，
式が一つしか書けない for 文の再初期化部分に二つの式を書くために使用できます．
カンマ演算子は，最も優先順位の低い演算子です．

```
// カンマ式を使用した例
for (i=0;i<0;i=i+1,j=j-1) { ... } // 再初期化に二つの式を書いた
```

#### 3.9.14. 演算子のまとめ

関数の呼び出しも厳密には「(引数リスト)」演算子と考えることができますが，
関数の呼び出しかたはchap3:funcページで説明したので省略します．
その他に，演算の順序を明確にするための「(式)」も含めて，
演算子の優先順位をchap3:operatorにまとめます．
表の上の方に書いてある演算子が優先順位の高い演算子です．
同じ高さにある演算子同士は同じ優先順位になります．
計算は優先順位の高いものから順に行われます．
例えば，「*」は「+」よりも優先順位が高いので先に計算されます．
優先順位が同じ場合は結合規則の欄で示した順に計算されます．

関数呼出，()，[]，.                   & 左から右 

### 3.10. 文

関数の内部に記述されるもので，変数宣言以外の記述を文と呼びます．
文は機械語に変換されて実行されます．
文には，空文，式文，ブロック，制御文(if 文や for 文)等があります．

#### 3.10.1. 空文

単独の「;」を空文と呼び，
文法上，一つの文として扱います．
本文のない for 文等で形式的な本文として使用します．
次に，空文を用いる例を示します．

```
for (i=2; i<n; i=i*i)  // 必要なことはこの1行で全部記述できた
  ;                    // 空文
```

#### 3.10.2. 式文

式の後ろに「;」を付けたものを式文と呼び，
文法上，一つの文として扱います．
代入式に「;」を付けた「式文」が同じ役割に使用されます．

```
式 ;
```

#### 3.10.3. ブロック

「{」と「 }」で括って複数の文をグループ化し，
文法上，一つの文にします．
if 文や while 文の「本文」は，文法的には一つの文でなければなりません．
複数の文を「本文」として実行させたい場合はブロックにします．
また，ブロックはローカル変数の有効範囲を決定します．
ブロック内部で宣言された変数の有効範囲はブロックの最後までです．

```
{ 文 または 変数宣言 ... }
```

#### 3.10.4. if 文

条件によって実行の流れを変更するための文です．
「条件式」は論理型の値を返す式でなければなりません．
「条件式」の値が true の場合「本文1」が実行され，
false の場合「本文2」が実行されます．
なお，else 節(「else 本文2」の部分)は省略することができます．

```
if ( 条件式 ) 本文1 【 else 本文2 】 
```

#### 3.10.5. while 文

条件が成立している間，while 文の「本文」を実行します．
「条件式」は論理型の値を返す式でなければなりません．
まず，「条件式」を計算し，値が true なら「本文」が実行されます．
これは，「条件式」の値が false になるまで繰り返されます．

```
while ( 条件式 ) 本文
```

#### 3.10.6. do-while 文

条件が成立している間，do-while 文の「本文」を実行します．
「条件式」は論理型の値を返す式でなければなりません．
まず「本文」を実行し，次に「条件式」を計算します．
「条件式」の値が true なら，再度，「本文」の実行に戻ります．
これは，「条件式」の値が false になるまで繰り返されます．

```
do 本文 while ( 条件式 ) ;
```

#### 3.10.7. for 文

便利に拡張された while 文です．
「条件式」は論理型でなければなりません．
まず，「初期化式」か「ローカル変数宣言」を実行します．
次に「条件式」を計算し，値が true なら「本文」を実行します．
最後に「再初期化式」を実行し，その後「条件式」の計算に戻ります．
これは，「条件式」の値が false になるまで繰り返されます．

「ローカル変数宣言」で宣言された変数は，「条件式」，「再初期化式」，
「本文」で使用することができますが，それ以降では使用できません．
「初期化式」，「条件式」，「再初期化式」のどれも省略可能です．
「条件式」を省略した場合は無限ループの記述になります．

```
for(【初期化式｜ローカル変数宣言】;【条件式】;【再初期化式】) 本文
```

```
// for 文の使用例
for (int j=0; j<10; j=j+1) {
  ...
  if (j==5) { ...                   // j が使用できる
  ...
}
n = j;                              // （エラー）j が未定義になる

for (;;) { ... }                    // 無限に本文を繰り返す
```

#### 3.10.8. return 文

関数から戻るときに使用します．
関数の途中で使用すると，関数の途中から呼び出し側に戻ることができます．
void 型以外の関数では，関数の最後の文が return 文でなければなりません．
「式」は void 型の関数では書いてはなりません．
逆に，void 型以外の関数では書かなければなりません．
「式」の型と関数の型は一致していなければなりません．
なお，interrupt 関数には void 型の関数と同じルールが適用されます．

```
return 【 式 】 ;
```

```
// void 型以外の関数
int f() {
  ...
  if (err) return 1;     // f の途中から戻る
  ...
  return 0;              // この return は省略できない
}

// void 型の関数
void g() {
  ...
  if (err) return;       // g の途中から戻る
  ...
  return;                // この return は省略しても良い
}
```

#### 3.10.9. break 文

for 文や while 文，do-while 文の繰り返しから脱出します．
多重ループから一度に脱出することはできません．

```
break;
```

#### 3.10.10. continue 文

for 文や while 文，do-while 文の本文の実行をスキップします．
for 文では再初期化式に，while 文と do-while 文では条件式にジャンプします．

```
continue;
```

## 4. ライブラリ関数

必要最低限の関数が，{トランスレータ版で使用できます．

### 4.1. 標準入出力ライブラリ

トランスレータ版では{
単純に置き換えができる場合は同じ名前の{
そうでない場合もあります．}．
{
{\tacos}版ではバッファサイズは 128 バイトです．
以下の関数が使用できます．

#### 4.1.1. printf 関数

標準出力ストリームにformat文字列を用いた変換付きで出力します．
出力した文字数を関数の値として返します．

```
#include <stdio.hmm>
public int printf(char[] format, ...);
```


```
%[-][数値]変換文字
```

数値は表示に使用するカラム数を表します．
数値を0で開始した場合は，
数値の右づめ表示で空白の代わりに0が用いられます．
使用できる変換文字は次の表の通りです．


#### 4.1.2. puts関数

標準出力ストリームへ１行出力します．
エラーが発生した場合はtrueを，正常時にはfalseを返します．

```
#include <stdio.hmm>
public boolean puts(char[] s);
```

#### 4.1.3. putchar関数

標準出力ストリームへ１文字出力します．
エラーが発生した場合はtrueを，正常時にはfalseを返します．

```
#include <stdio.hmm>
public boolean putchar(char c);
```

#### 4.1.4. getchar関数

標準入力ストリームから１文字入力します．
現在のところ，TacOS では標準入力を EOF にする方法は準備されていません．

```
#include <stdio.hmm>
public char getchar();
```

#### 4.1.5. fopen関数

ファイルを開きます．
パスは``/''区切りで表現します．
エラー時にnullを返します．

```
#include <stdio.hmm>
public FILE fopen(char[] path, char[] mode);
```

{tacos}版では\modeが次のような意味を持ちます．
なお，トランスレータ版では，modeは{cl}の\fopenにそのまま渡されます．



#### 4.1.6. fclose関数

ストリームをクローズします．
標準入出力ストリーム（stdin，stdout，stderr）を
クローズすることはできません．
エラー時にtrueを返します．

```
#include <stdio.hmm>
public boolean fclose(FILE stream);
```

#### 4.1.7. fseek関数

seek 位置は，
{tacos}版では\offsh(16bit)，
トランスレータ版ではoffsh(32bit)，

正常時はfalseを返します．
エラーが発生した場合，{
トランスレータ版ではtrueを返します．

```
#include <stdio.hmm>
public boolean fseek(FILE stream, int offsh, int offsl);
```

#### 4.1.8. fsize関数

ファイルサイズは，
{tacos}版では\size[0](上位16bit)，
トランスレータ版ではsize[0](上位32bit)，

正常時はfalseを返します．
エラーが発生した場合，{
トランスレータ版ではtrueを返します．

```
#include <stdio.hmm>
public boolean fsize(char[] path, int[] size);
```

#### 4.1.9. fprintf関数

出力ストリームを明示できるprintf関数です．
出力ストリームは，fopenで開いたファイルかstdout，

```
#include <stdio.hmm>
public int fprintf(FILE stream, char[] format, ...);
```

#### 4.1.10. fputs関数

出力ストリームを明示できるputs関数です．
出力ストリームは，fopenで開いたファイルかstdout，

```
#include <stdio.hmm>
public boolean fputs(char[] s, FILE stream);
```

#### 4.1.11. fputc関数

出力ストリームを明示できるputchar関数です．
出力ストリームは，fopenで開いたファイルかstdout，

```
#include <stdio.hmm>
public boolean fputc(char c, FILE stream);
```

#### 4.1.12. fgets関数

任意の入力ストリームから１行入力します．
入力はbufに文字列として格納します．
通常，bufに'\n'も格納されます．
正常時にはbufを返します．

```
#include <stdio.hmm>
public char[] fgets(char[] buf, int n, FILE stream);
```


```
while (fgets(buf, N, stdin)!=null) { ...
```


#### 4.1.13. fgetc関数

任意の入力ストリームから１文字入力します．
EOFチェックはfeof関数を用いて行います．

```
#include <stdio.hmm>
public char fgetc(FILE stream);
```

{

#### 4.1.14. feof関数

入力ストリームが EOF になっていると true を返します．
{\bf C言語 のfeof関数と仕様が異なります．}
なります．

```
#include <stdio.hmm>
public boolean feof(FILE stream);
```

#### 4.1.15. ferror関数

ストリームがエラーを起こしていると true を返します．

```
#include <stdio.hmm>
public boolean ferror(FILE stream);
```

#### 4.1.16. fflush関数

出力ストリームのバッファをフラッシュします．
入力ストリームをフラッシュすることはできません．
正常時false，エラー時true を返します．
フラッシュしても何も起きません．

```
#include <stdio.hmm>
public boolean fflush(FILE stream);
```

#### 4.1.17. readDir関数

FAT16ファイルシステムのディレクトリファイルを読みます．
大きさ12の文字配列で初期化されている必要があります．

```
#include <stdio.hmm>
public int readDir(int fd, Dir dir);
```


```
struct Dir {
    char[] name;              // ファイル名
    int    attr;              // ファイルの属性
    int    clst;              // ファイルの開始クラスタ
    int    lenH, lenL;        // ファイルの長さ
};
```

次にlsプログラムのソースコードから抜粋したreadDir関数の使用例を示します．

```
#include <stdio.hmm>
Dir dir = {"            ", 0, 0, 0, 0 };
int[] fLen = array(2);

// ディレクトリの一覧を表示する
int printDir(char[] fname) {
  int fd = open(fname, READ);                // ディレクトリを開く
  if (fd<0) {
    perror(fname);
    return 1;
  }

  printf("FileNameExt Attr Clst FileLength\n");
  while (readDir(fd, dir)>0) {               // ファイルが続く間
    fLen[0]=dir.lenH;
    fLen[1]=dir.lenL;
    printf("%11s 0x%02x %4d %9ld\n",         // ファイルの一覧出力
            dir.name, dir.attr, dir.clst,fLen);
  }
  close(fd);
  return 0;
}
```

#### 4.1.18. perror関数


```
#include <stdio.hmm>
#include <errno.hmm>
public int errno;
public void perror(char[] msg);
```

 & 1{c|}{メッセージ}
 & 1{c}{意味} 
ENAME     & Invalid file name           & ファイル名が不正 
ENOENT    & No such file or directrory  & ファイルが存在しない 
EEXIST    & File exists                 & 同名ファイルが存在する 
EOPEND    & File is opened              & 既にオープンされている 
ENFILE    & File table overflow         & システム全体のオープン数超過 
EBADF     & Bad file number             & ファイル記述子が不正 
ENOSPC    & No space left on device     & デバイスに空き領域が不足 
EPATH     & Bad path                    & パスが不正 
EMODE     & Bad mode                    & モードが一致しない 
EFATTR    & Bad attribute               & ファイルの属性が不正 
ENOTEMP   & Directory is not empty      & ディレクトリが空でない 
EINVAL    & Invalid argument            & 引数が不正 
EMPROC    & Process table overflow      & プロセスが多すぎる 
ENOEXEC   & Bad EXE file                & EXE ファイルが不正 
EMAGIC    & Bad MAGIC number            & 不正なマジック番号 
EMFILE    & Too many open files         & プロセス毎のオープン数超過 
ECHILD    & No children                 & 子プロセスが存在しない 
ENOZOMBI  & No zombie children          & ゾンビ状態の子が存在しない 
ENOMEM    & Not enough memory           & 十分な空き領域が無い 
EAGAIN    & Try again                   & 再実行が必要 
ESYSNUM   & Invalid system call number  & システムコール番号が不正 
EZERODIV  & Zero division               & ゼロ割り算 
EPRIVVIO  & Privilege violation         & 特権違反 
EILLINST  & Illegal instruction         & 不正命令 
EMEMVIO   & Memory violation            & メモリ保護違反 
EUSTK     & Stack overflow              & スタックオーバーフロー 
EUMODE    & stdio: Bad open mode        & モードと使用方法が矛盾 
EUBADF    & stdio: Bad file pointer     & 不正な fp が使用された 
EUEOF     & fgetc: EOF was ignored      & fgetc前にEOFチェック必要 
EUNFILE   & fopen: Too many open files  & プロセス毎のオープン超過 
EUSTDIO   & fclose: Standard i/o should & 標準ioはクローズできない 
          &  not be closed              &                          
EUFMT     & fprintf: Invalid conversion & 書式文字列に不正な変換 
EUNOMEM   & malloc: Insufficient memory & ヒープ領域が不足 
EUBADA    & free: Bad address           & mallocした領域ではない 

#### 4.1.19. プログラム例


##### 4.1.19.1. TacOS 専用のプログラム例

また，アプリケーションが負の終了コードで終わった場合，
シェルが終了コードをerrnoとみなし
エラーメッセージを表示する仕様になっています．
更にライブラリは，ユーザプログラムのバグが原因と考えられるエラーや，
メモリ不足のような対処が難しいエラーが発生したとき，
負の終了コードでプログラムを終了します．
そこで，以下のようなエラー処理を簡略化したプログラムを書くことができます．

このプログラムは，
メモリ不足でFILE構造体の割り付けができないなど，
対処が難しいエラーの場合に，
プログラムの終了コードによりシェルがエラーメッセージを表示します．

ファイルが見つからないなどプログラムに知らせた方が良いエラーの場合は，
可能ならユーザプログラムがエラー回復を試みるべきです．
下のプログラムはエラー回復を試みることなく
エラーメッセージの表示をプログラム中で行っていませんが，
シェルがerrnoに対応したエラーメッセージを表示します．

EOF の検出はfeof関数を用いて行います．
{


```
// ファイルの内容を表示するプログラム（TacOS 専用バージョン）
#include <stdio.hmm>
#include <errno.hmm>
public int main(int argc, char[][] argv) {
  FILE fp = fopen("a.txt", "r");
  if (fp==null) exit(errno);     // エラー表示をシェルに任せる
  while (!feof(fp)) {
    putchar(fgetc(fp));
  }
  fclose(fp);
  return 0;
}
```

##### 4.1.19.2. TacOS トランスレータ共通版のプログラム例

前の例ではシェルがエラーメッセージを表示したので，
エラーメッセージの内容をプログラムから細かく指定することができませんでした．
次の例ではプログラムが自力でエラーメッセージを表示するので，
エラーになったファイルの名前をエラーメッセージに含めることができます．

エラー表示を行ったプログラムは終了コード1で終わります．
終了コードが正なので，シェルはエラーメッセージを表示しません．

```
// ファイルの内容を表示するプログラム
// （トランスレータ，TacOS 共通バージョン）
#include <stdio.hmm>
public int main(int argc, char[][] argv) {
  char fname = "a.txt";
  FILE fp = fopen(fname, "r");
  if (fp==null) {
    perror(fname);     // エラー表示を自分で行う
    return 1;
  }
  while (!feof(fp)) {
    putchar(fgetc(fp));
  }
  fclose(fp);
  return 0;
}
```

### 4.2. 標準ライブラリ


#### 4.2.1. malloc関数

ヒープ領域にsizeバイトのメモリ領域を確保し，
領域を指す参照を返します．
領域を指す参照は全ての参照変数に代入できます．
配列領域は，iMalloc，cMalloc，bMalloc，rMallocを用いて確保します．
配列領域には添字チェックのためのデータが組み込まれますので，

```
#include <stdlib.hmm>
public void[] malloc(int size);
```

{
終了コードEUNOMEMでプログラムを終了します．
トランスレータ版では，エラーメッセージを表示したあと
終了コード1でプログラムを終了します．

#### 4.2.2. calloc関数

連続したヒープ領域にsバイトのメモリ領域をc個確保し，
領域を指す参照を返します．
確保した領域はゼロでクリアします．
エラー処理と制約はmalloc関数と同様です．

```
#include <stdlib.hmm>
public void[] calloc(int c, int s);
```

#### 4.2.3. iMalloc関数

ヒープ領域にint型の要素数cの配列領域を確保し，
領域を指す参照を返します．
int型配列の参照変数にしか代入できません．
実行時の添字範囲チェックに必要なデータも作成するので，

```
#include <stdlib.hmm>
public int[] iMalloc(int c);
```

#### 4.2.4. cMalloc関数

ヒープ領域にchar型の要素数cの配列領域を確保し，
領域を指す参照を返します．
char型配列の参照変数にしか代入できません． 
実行時の添字範囲チェックに必要なデータも作成するので，

```
#include <stdlib.hmm>
public char[] cMalloc(int c);
```

#### 4.2.5. bMalloc関数

ヒープ領域にboolean型の要素数cの配列領域を確保し，
領域を指す参照を返します．
boolean型配列の参照変数にしか代入できません．
実行時の添字範囲チェックに必要なデータも作成するので，

```
#include <stdlib.hmm>
public boolean[] bMalloc(int c);
```

#### 4.2.6. rMalloc関数

ヒープ領域に参照型の要素数cの配列領域を確保し，
領域を指す参照を返します．
参照型配列の参照変数にしか代入できません．
実行時の添字範囲チェックに必要なデータも作成するので，

```
#include <stdlib.hmm>
public void[][] rMalloc(int c);
```

#### 4.2.7. free関数

{
（マジックナンバーが破壊されている，管理されている空き領域と重なる等），
終了コードEUBADAでプログラムを終了します．

```
#include <stdlib.hmm>
public void free(void[] mem);
```

#### 4.2.8. atoi関数

それが表現する値を返します．

```
#include <stdlib.hmm>
public int atoi(char[] s);
```

#### 4.2.9. htoi関数

それが表現する値を返します．

```
#include <stdlib.hmm>
public int htoi(char[] s);
```

#### 4.2.10. srand関数


```
#include <stdlib.hmm>
public void srand(int seed);
```

#### 4.2.11. rand関数


```
#include <stdlib.hmm>
public int rand();
```

#### 4.2.12. exit関数

プログラムを終了します．

{
使用できるコードはchap4:errに記号名として定義されています．
負の値を返すと親プロセスがシェルの場合，
シェル側でエラーメッセージを表示してくれます．

```
#include <stdlib.hmm>
public void exit(int status);
```

#### 4.2.13. environ変数

トランスレータ版との互換性のため自分で宣言しないで下さい．

```
#include <stdlib.hmm>
public char[][] environ;
```

#### 4.2.14. getEnv関数

指定された環境変数が存在しない場合にはnullを返します．

```
#include <stdlib.hmm>
public char[] getEnv(char[] name);
```

#### 4.2.15. putEnv関数

エラーが発生した場合にはtrueを，正常時にはfalseを返します．

```
#include <stdlib.hmm>
public boolean putEnv(char[] str);
```

#### 4.2.16. setEnv関数

指定された環境変数がすでに存在すれば何もせず正常終了します．
エラーが発生した場合にはtrueを，正常時にはfalseを返します．

```
#include <stdlib.hmm>
public boolean setEnv(char[] name, char[] value, boolean overwrite);
```

#### 4.2.17. unsetEnv関数

指定された環境変数が存在しない場合，何もせず正常終了します．
エラーが発生した場合にはtrueを，正常時にはfalseを返します．

```
#include <stdlib.hmm>
public boolean unsetEnv(char[] name);
```

#### 4.2.18. absPath関数

エラーが発生した場合にはtrueを，正常時にはfalseを返します．

```
#include <stdlib.hmm>
public boolean absPath(char[] path, char[] buf, int bufSiz);
```

#### 4.2.19. getWd関数

返り値の文字列を変更しないでください．

```
#include <stdlib.hmm>
public char[] getWd();
```

#### 4.2.20. chDir関数

エラーが発生した場合には true を，正常時には false を返します．

```
#include <stdlib.hmm>
public boolean chDir(char[] pathname);
```

### 4.3. 文字列操作関数


#### 4.3.1. strCpy関数

文字列sを文字配列dにコピーし，

```
#include <string.hmm>
public char[] strCpy(char[] d, char[] s);
```

#### 4.3.2. strNcpy関数

文字列sの最大n文字を文字配列dにコピーし，
文字配列の使用されない部分には'\0'が書き込まれます．
文字列sの長さがn以上の場合は，

```
#include <string.hmm>
public char[] strNcpy(char[] d, char[] s, int n);
```

#### 4.3.3. strCat関数

文字列sを文字配列dに格納されている文字列の後ろに追加し，

```
#include <string.hmm>
public char[] strCat(char[] d, char[] s);
```

#### 4.3.4. strNcat関数

文字列sの先頭n文字未満を，
文字配列dに格納されている文字列の後ろに追加し，

```
#include <string.hmm>
public char[] strNcat(char[] d, char[] s, int n);
```

#### 4.3.5. strCmp関数

文字列s1と文字列s2を比較します．

```
#include <string.hmm>
public int strCmp(char[] s1, char[] s2);
```

#### 4.3.6. strNcmp関数

文字列s1と文字列s2の先頭n文字を比較します．

```
#include <string.hmm>
public int strNcmp(char[] d, char[] s, int n);
```

#### 4.3.7. strLen関数

文字列sの長さを返します．
長さに'\0'は含まれません．

```
#include <string.hmm>
public int strLen(char[] s);
```

#### 4.3.8. strChr関数

文字列sの中で最初に文字cが現れる位置を，
{bf\s文字配列の添字}で返します．
文字cが含まれていない場合は-1を返します．

```
#include <string.hmm>
public int strChr(char[] s, char c);
```

#### 4.3.9. strRchr関数

文字列sの中で最後に文字cが現れる位置を，
{bf\s文字配列の添字}で返します．
文字cが含まれていない場合は-1を返します．

```
#include <string.hmm>
public int strRchr(char[] s, char c);
```

#### 4.3.10. strStr関数

文字列s1の中に文字列s2が現れる位置を，
{bf\s1文字配列の添字}で返します．
文字列s2が含まれていない場合は-1を返します．

```
#include <string.hmm>
public int strStr(char[] s1, char[] s2);
```

### 4.4. 文字クラス分類関数


#### 4.4.1. isAlpha関数

文字cがアルファベット（'A'〜'Z'，'a'〜'z'）ならtrueを返します．

```
#include <ctype.hmm>
public boolean isAlpha(char c);
```

#### 4.4.2. isDigit関数

文字cが数字（'0'〜'9'）ならtrueを返します．

```
#include <ctype.hmm>
public boolean isDigit(char c);
```

#### 4.4.3. isAlnum関数

文字cがアルファベットか数字
（'A'〜'Z'，'a'〜'z'，'0'〜'9'）ならtrueを返します．

```
#include <ctype.hmm>
public boolean isAlnum(char c);
```

#### 4.4.4. isPrint関数

文字cが制御文字以外（文字コードが0x20以上）ならtrueを返します．

```
#include <ctype.hmm>
public boolean isPrint(char c);
```

#### 4.4.5. isLower関数

文字cがアルファベット小文字（'a'〜'z'）ならtrueを返します．

```
#include <ctype.hmm>
public boolean isLower(char c);
```

#### 4.4.6. isUpper関数

文字cがアルファベット大文字（'A'〜'Z'）ならtrueを返します．

```
#include <ctype.hmm>
public boolean isUpper(char c);
```

#### 4.4.7. isXdigit関数

文字cが16進数文字（'0'〜'9'，'A'〜'F'，'a'〜'f'）ならtrueを返します．

```
#include <ctype.hmm>
public boolean isXdigit(char c);
```

#### 4.4.8. isSpace関数

文字cが空白文字（'\t'(TAB)，'\n'(LF)，'\x0b'(VT)，

```
#include <ctype.hmm>
public boolean isSpace(char c);
```

#### 4.4.9. toLower関数

文字cがアルファベット大文字なら小文字に変換して返します．
文字cがアルファベット大文字以外の場合は変換しないで返します．

```
#include <ctype.hmm>
public char toLower(char c);
```

#### 4.4.10. toUpper関数

文字cがアルファベット小文字なら大文字に変換して返します．
文字cがアルファベット小文字以外の場合は変換しないで返します．

```
#include <ctype.hmm>
public char toUpper(char c);
```

### 4.5. 特殊な関数

{
これらの代用となる関数が#include <crt0.hmm>を書いた後で使用できます．
ここで紹介する関数はトランスレータ版では使用できません．

#### 4.5.1. {

整数から参照へ型を変換する関数です．
整数を引数に void[] 参照(アドレス)を返します．
関数の値は void[] 型の参照なので，
どのような参照型変数にも代入できます．

```
#include <crt0.hmm>
public void[] _iToA(int a);
```

#### 4.5.2. {

参照から整数へ型を変換する関数です．
参照(アドレス)を引数に整数を返します．
引数の型は void[] なので，
参照型ならどんな型でも渡すことができます．

```
#include <crt0.hmm>
public int _aToI(void[] a);
```

#### 4.5.3. {

参照から参照へ型を変換する関数です．
異なる型の参照の間で代入をするために使用できます．

```
#include <crt0.hmm>
public void[] _aToA(void[] a);
```

#### 4.5.4. {

参照(アドレス)と整数を引数に渡し，
参照から整数バイト先の参照(アドレス)を返します．

```
#include <crt0.hmm>
public void[] _addrAdd(void[] a, int n);
```

#### 4.5.5. {

参照(アドレス)の大小比較を行う関数です．
しかし，malloc，free 関数等の実現には
アドレスの大小比較が必要です．
そこで，アドレスの大小比較をする {\ul}aCmp 関数を用意しました．
{\ul}aCmp 関数は，a の方が大きい場合は 1 を，

```
#include <crt0.hmm>
public int _aCmp(void[] a, void[] b);
```

#### 4.5.6. {

符号無し数の比較を行う関数です．
{\ul}uCmp 関数は，a の方が大きい場合は 1 を，

```
#include <crt0.hmm>
public int _uCmp(int a, int b);
```

#### 4.5.7. {

printf 関数のような可変個引数の関数を実現するために，
可変個引数関数の内部で引数を配列としてアクセスできるようにする関数です．
{\ul}args 関数は{\ul}args を呼び出した
{cmm}関数の第1引数を添字\0とするint配列を返します．

```
#include <crt0.hmm>
public int[] _args();
```

次に可変個引数関数の使用例を示します．

```
int f(char[] s, ...) {         // ... は可変個引数の関数を表す
  int[] args = _args();        // args配列は引数配列を格納
  printf("%s\n", args[0]);     // 引数 s のこと（第１引数）
  printf("%d\n", args[1]);     // 引数 ... の最初に該当（第２引数）
  printf("%d\n", args[2]);     // 引数 ... の２番に該当（第３引数）
```

#### 4.5.8. {

計算の対象はint配列で上位[0]，下位[1]の順に表現した
符号なし32ビットデータです．
引数のdst，srcが32ビットデータを表現するint配列です．
$dst = dst + src$を計算します．
{\ul}add32 関数が返す値はdst配列の参照です．

```
#include <crt0.hmm>
public int[] _add32(int[] dst, int[] src);
```

次に使用例を示します．
この例は{\ul}add32 関数がdstの参照を返すことを利用しています．

```
int[] a = {12345,6789}:
int[] b = {23456,7890}:
...
  _add32(_add32(a, b), b);  // a = a + b + b;
```

#### 4.5.9. {

$dst = dst - src$を計算します．
{\ul}sub32 関数が返す値はdst配列の参照です．

```
#include <crt0.hmm>
public int[] _sub32(int[] dst, int[] src);
```

#### 4.5.10. {

$dst = dst / src$を計算します．
{\ul}div32 関数が返す値はdst配列の参照です．

```
#include <crt0.hmm>
public int[] _div32(int[] dst, int src);
```

#### 4.5.11. {

上記の３つの関数と異なり関数の返り値とsrcがint型，

```
#include <crt0.hmm>
public int _mod32(int[] dst, int src);
```

#### 4.5.12. {

I/O特権モードのアプリケーションプログラムだけが使用できます．
I/O空間のp番地からワード（16ビット）のデータを入力します．

```
#include <crt0.hmm>
public int _in(int p);
```

#### 4.5.13. {

I/O特権モードのアプリケーションプログラムだけが使用できます．
I/O空間のp番地にvのワード（16ビット）データを出力します．

```
#include <crt0.hmm>
public vod _out(int p, int v);
```

## 5. システムコール

{\bf トランスレータ版では使用できません．}

### 5.1. プロセス関連

UNIXのfork-exec方式とは異なります．


#### 5.1.1. exec

新しいプロセスで新しいプログラムの実行を開始します．
第２引数（char[][]argv）に渡される文字列配列です．

```
#include <syslib.hmm>
public int exec(char[] path, void[] argv, void[] envp);
```

下に使用例を示します．
最後にnullを格納します．
環境変数に興味がない場合は，
自身の環境変数（environ）を子プロセスに渡します．

```
  #include <stdlib.hmm>
  #include <syslib.hmm>
  char[][] args = {"prog", "param1", "param2", null};
  public int main() {
    exec("/bin/prog.exe", args, environ);
    return 1;
  }
```

子プロセス側のプログラム（prog.cmm）は次のようになります．

```
public int main(int argc, char[][]argv, char[][]envp) {
  int c = argc;       // 前のプログラムで起動されたとき 3
  char[] s = argv[1]; // 前のプログラムで起動されたとき "param1"
  return 0;
}
```

#### 5.1.2. \ul exit

普通は標準ライブラリのexitを使用します．

負の値はchap4:errに示す記号名で定義されています．
負の値を返すと親プロセスがシェルの場合，
シェル側でエラーメッセージを表示してくれます．

```
#include <syslib.hmm>
public void _exit(int status);
```

#### 5.1.3. wait

子プロセスが終了した際，stat[0]に終了コードが書き込まれます．

```
#include <syslib.hmm>
public int wait(int[] stat);
```

#### 5.1.4. sleep

それ以外では，sleepは0を返します．

```
#include <syslib.hmm>
public int sleep(int ms);
```

### 5.2. ファイル操作

VFATには対応していません．

#### 5.2.1. creat


```
#include <syslib.hmm>
public int creat(char[] path);
```

#### 5.2.2. remove


```
#include <syslib.hmm>
public int remove(char[] path);
```

#### 5.2.3. mkDir


```
#include <syslib.hmm>
public int mkDir(char[] path);
```

#### 5.2.4. rmDir

削除するディレクトリが空でない場合はエラーになります．

```
#include <syslib.hmm>
public int rmDir(char[] path);
```

#### 5.2.5. stat

エラー発生なら負のエラー番号を返します．

```
#include <syslib.hmm>
public int stat(char[] path, Stat stat);
```

ディレクトリエントリから読みだしたファイルの属性です．
詳しい意味はFAT16ファイルシステムの文献を参照してください．

```
struct Stat {   // FAT16ファイルシステムからファイルの情報を取り出す．
  int attr;     // read-only(0x01)，hidden(0x02)，directory(0x10) 他
  int clst;     // ファイルの開始クラスタ番号
  int lenH;     // ファイル長上位16ビット
  int lenL;     // ファイル長下位16ビット
};
```

### 5.3. ファイルの読み書き

ファイルの読み書きには，
通常はchap4:stdioページの標準入出力ライブラリ関数を用います．
以下のシステムコールは，主にライブラリ関数の内部で使用されます．

#### 5.3.1. open

エラー発生なら負のエラー番号を返します．
ファイルが存在しない場合は，どのモードでもエラーになります．
新規ファイルに書き込みたい場合は，
事前にcreatシステムコールを用いてファイルを作成しておく必要があります．

ディレクトリはchap4:readDirページのreadDir関数で読みます．

```
#include <syslib.hmm>
public int open(char[] path, int mode);
```

#### 5.3.2. close


```
#include <syslib.hmm>
public int close(int fd);
```

#### 5.3.3. read

データを読みます．
エラー発生なら負のエラー番号を返します．
EOFでは0を返します．

```
#include <syslib.hmm>
public int read(int fd, void[] buf, int len);
```

#### 5.3.4. write

エラー発生なら負のエラー番号を返します．

```
#include <syslib.hmm>
public int write(int fd, void[] buf, int len);
```

#### 5.3.5. seek

seek位置は，上位16bit（ptrh）と
下位16bit（ptrl）を組み合わせて指定します．
エラー発生なら負のエラー番号を返します．

```
#include <syslib.hmm>
public int seek(int fd, int ptrh, int ptrl);
```

### 5.4. コンソール関連

コンソール入出力には，
通常はchap4:stdioページの標準入出力ライブラリ関数を用います．
以下のシステムコールは，主にライブラリ関数の内部で使用されます．
書き込みをする場合にライブラリ関数内部で使用されます．

#### 5.4.1. ttyRead

読み込んだ内容はbufで指定されるバッファに格納されます．
読み込んだ内容の最後に'\0'は含まれませんが'\n'は含まれます．

```
#include <syslib.hmm>
public int ttyRead(void[] buf, int len);
```

#### 5.4.2. ttyWrite


```
#include <syslib.hmm>
public int ttyWrite(void[] buf, int len);
```

#### 5.4.3. ttyCtl


```
#include <syslib.hmm>
public int ttyCtl(int cmd, int mode);
```

モードをTTYCTL_MODE_COOKED，TTYCTL_MODE_ECHO，TTYCTL_MODE_NBLOCKの
ビットマップで表現します．

このモードがONになっている場合，
コンソール入出力で'\r'と'\n'の間で適切な変換が行われます．
また，'\b'（バックスペースキー）を用いた行編集ができます．

このモードがONになっている場合，
キーボードから入力した文字が画面にエコーバックされます．

このモードがONになっている場合，ttyReadが入力待ちになりません．

以下にプログラム例を示します．

```
int mode = ttyCtl(TTYCTL_GETMODE, 0);      // 現在のモードを取得
int noechoMode = mode & ~TTYCTL_MODE_ECHO;
ttyCtl(TTYCTL_SETMODE, noechoMode);       // NOECHOモードに変更
...
ttyCtl(TTYCTL_SETMODE, mode);             // 最初の状態に戻す
```


## 6. {

以下に，{
メタ文字の意味は下表の通りです．
文法に掲載しませんが次の２種類のコメントが使用できます．


コメント：　/* ... */ または // ...



{tabular{l | l}
A ※     & Aのゼロ回以上の繰り返し 
《...》 & グループ                
【...】 & 省略可能                
A ｜ B  & A または B


{tabular{l l}
プログラム：  & 《 構造体宣言 ｜ 
                   大域変数宣言 ｜ 関数定義 ｜ 関数宣言 》※  
構造体宣言：  & struct 名前
                { 《 型 名前 《 , 名前 》※ ; 》※ } ; 
だまし型宣言：& typedef 名前 ; 
大域変数宣言：& 【 public 】 型 名前 【 = 初期化 】
              & 《 , 名前 【 = 初期化 】 》※   ; 
関数定義：    & 【 public 】 型 名前( 引数リスト ) ブロック 
関数宣言：    & 【 public 】 型 名前( 引数リスト ) ; 
初期化：      & 定数式 ｜ { 初期化 《 , 初期化 》※ } ｜
                array( 数値 《 , 数値 》※ ) 
引数リスト：  & 【 型 名前 《 , 型 名前 》※  【 , ... 】 】 ｜ ... 
ブロック：    & { 《 局所変数宣言 ｜ 文 》※ } 
局所変数宣言：& 型 名前 【 = 代入式 】
                《 , 名前 【 = 代入式 】 》※   ; 
文：          & IF文 ｜ WHILE文 ｜ DO-WHILE文 ｜ FOR文 ｜ RETURN文 ｜~ 
              & BREAK文 ｜ CONTINUE文 ｜ ブロック ｜ 式 ; ｜ ;
IF文：        & if ( 式 ) 文  【 else 文  】 
WHILE文：     & while ( 式 ) 文 
DO-WHILE文:   & do 文 while ( 式 ) ; 
FOR文：       & for( 【 式 ｜ 局所変数定義 】 ; ~
               【 式 】 ; 【 式 】 ) 文 
RETURN文：    & return 【 式 】; 
BREAK文：     & break; 
CONTINUE文：  & continue; 
式：          & 代入式 《 , 代入式 》※  
代入式：      & 論理OR式 《 = 論理OR式 》※  
論理OR式：    & 論理AND式 《 verb++ 論理AND式 》※  
論理AND式：   & OR式 《 && OR式  》※  
OR式：        & XOR式 《 
XOR式：       & AND式 《 ^ AND式  》※  
AND式：       & 等式 《 & 等式 》※  
等式：        & 比較式 《《 == ｜ != 》 比較式 》※ 
比較式：      & シフト式 《《 < ｜ <= ｜ > ｜ >= 》 シフト式 》※ 
シフト式：    & 和式 《《 << ｜ >> 》 和式 》※ 
和式：        & 積式 《《 + ｜ - 》 積式 》※ 
積式：        & 単項式 《《 * ｜ / ｜ 
単項式：      & 《 + ｜ - ｜ ! ｜ ~ 》※  因子 
因子：        & 名前 ｜ 定数 ｜ 関数呼出 ｜ ( 式 ) ｜ ~
                因子[ 代入式 ] ｜ 
              & 因子.名前 ｜ sizeof( 型 ) ｜ addrof( 名前 ) ｜
              & chr( 式 ) ｜ ord( 式 ) ｜ bool( 式 ) 
関数呼出：    & 名前 ( 【 代入式 《 , 代入式 》※ 】 )
型：          & int ｜ char ｜ boolean ｜ void ｜ interrupt ｜~
                名前 ｜ 型[] 
定数：        & 数値 ｜ 文字定数 ｜ 文字列 ｜ null ｜ true ｜ false 
}

## 7. コマンドリファレンス


### 7.1. {

{で実行できる{\tt .exe}ファイルに変換します．
{command:cmmc {
「{\tt Util--}ユーティリティ」プログラムを自動的に呼び出すシェルスクリプトです．

{\bf 形式 : } & cm2e [-h] [-o exec] [-S] [-c] [-E] [-K] [-P]  
              & ~~~  [-nostdinc] [-I <dir>] [-c] [-Dxx=yy] <file>...

{\tt <file>...}の各ファイルについて，
プリプロセッサ({\tt cpp})，
コンパイラ({\tt c--})，
アセンブラ({\tt as--})を順に呼び出し，
リロケータブルオブジェクト(「{\tt Util--}解説書」参照)に変換します．
次に，
リンカー({\tt ld--})を用いリロケータブルオブジェクトを結合します．
最後に，実行可能形式作成プログラム({\tt objexe--})を呼び出し
{\tt .exe}ファイルを作成します．

{
指定されたファイルの拡張子からファイルの種類を判断し，
必要な処理を自動的に実行します．
拡張子「{\tt .cmm}」は{
「{\tt .s}」は{
「{\tt .o}」は{


{\tt -o}オプションの後ろに空白で区切ってファイル名を入力します．
  それより後の処理を行いません．
  それより後の処理を行いません．
  標準出力ストリームに書き出します．
  コンパイル結果に，
  ユーザプログラム用のスタックオーバーフローチェック機能を埋め込みません．
  {
  IN，OUT機械語命令を実行することができます．
このオプションを繰り返し使用することで複数のディレクトリを追加できます．
次に使用例を示します．

### 7.2. {

{プログラムに変換した後，
{
{

{\bf 形式 : } & cm2c [-h] [-o exec] [-S] [-c] [-E] [-nostdinc] [-rtc]  
              & ~~~  [-nortc] [-I <dir>] [-Dxx=yy] <file>...

{\tt <file>...}の各ファイルについて，
プリプロセッサ({\tt cpp})，
トランスレータ({\tt c-c--}または{\tt rtc-c--}），
{\tt C}コンパイラドライバ({\tt cc})を順に呼び出し，
UNIXやmacOSのリロケータブルオブジェクトに変換します．
次に，{\tt C}コンパイラドライバ({\tt cc})を呼び出し，
リロケータブルオブジェクトを結合し実行可能ファイルを作成します．

{
指定されたファイルの拡張子からファイルの種類を判断し，
必要な処理を自動的に実行します．
拡張子「{\tt .cmm}」は{
「{\tt .c}」は{
「{\tt .o}」はUNIXやmacOSのリロケータブルオブジェクトと判断します．


{\tt -o}オプションの後ろに空白で区切ってファイル名を入力します．
  それより後の処理を行いません．
  それより後の処理を行いません．
  標準出力ストリームに書き出します．
  実行時エラーチェックの内容は，null参照の使用と配列の添字範囲チェックです．
  デフォルトが{\tt -rtc}です．
  このオプションを繰り返し使用することで複数のディレクトリを追加できます．

### 7.3. {

{
{
内部で「command:vcmmc {

{\bf 形式 : }~~~cm2i [-h] [-E] [-nostdinc] [-I <dir>] [-Dxx=yy] <file>...

{\tt <file>...}の各ファイルについて，
プリプロセッサ({\tt cpp})，
コンパイラ({\tt ic-c--})
を順に呼び出し中間言語({\tt .i})を出力します．
{
拡張子「{\tt .cmm}」の{


標準出力ストリームに書き出します．
それより後の処理を行いません．
このオプションを繰り返し使用することで複数のディレクトリを追加できます．

### 7.4. {

{
{
内部で「command:vcmmc {

{\bf 形式 : }~~~cm2v [-h] [-E] [-nostdinc] [-I <dir>] [-Dxx=yy] <file>...

{\tt <file>...}の各ファイルについて，
プリプロセッサ({\tt cpp})，
コンパイラ({\tt vm-c--})
を順に呼び出し仮想スタックマシンのニーモニック({\tt .v})を出力します．
{
拡張子「{\tt .cmm}」の{


標準出力ストリームに書き出します．
それより後の処理を行いません．
このオプションを繰り返し使用することで複数のディレクトリを追加できます．

### 7.5. {

{用コンパイラです．
{\bf 通常は{

{\bf 形式 : }~~~c-- [-h] [-v] [-O0] [-O] [-O1] [-K] [<source file>]
({\bf 注意}：オプションは書式の順番で指定する必要があります．)

引数に C-- 言語 のソースプログラムファイルを指定した場合は，
指定されたファイルからソースプログラムを読み込みます．
ファイルが省略された場合は標準入力ストリームからソースプログラムを読み込みます．
どちらの場合もコンパイル結果は標準出力ストリームに出力します．
ソースプログラムファイルの拡張子は「.cmm」にします．

ソースコード中の定数式をコンパイル時に計算したり，
実行されることがないプログラムの部分を削除したりする等の最適化をしません．
デフォルトでONになっているので指定する必要はありません．
関数入口へのスタックオーバーフロー検出コードの埋め込みが抑制されます．

### 7.6. {

{に変換して出力するトランスレータです．
{\bf 通常は{

{\bf 形式 : }~~~c-c-- [-h] [-v] [-O0] [-O] [-O1] [-K] [<source file>]
({\bf 注意}：オプションは書式の順番で指定する必要があります．)

引数の意味は{

### 7.7. {

{に変換して出力するトランスレータです．
{\bf 通常は{
{と異なり，
ユーザプログラムがnull参照を使用したり，
範囲外の添字を用いて配列をアクセスしていないかチェックする
実行時エラーチェック用のコードを出力に埋め込みます．

{\bf 形式 : }~~~rtc-c-- [-h] [-v] [-O0] [-O] [-O1] [-K] [<source file>]
({\bf 注意}：オプションは書式の順番で指定する必要があります．)

引数の意味は{

### 7.8. {

中間言語を出力する{
{\bf 通常は{

中間言語の仕様は，app:vmページに掲載してあります．
コンパイラの仕組みを学習したいときに利用します．
{

{\bf 形式 : }~~~ic-c-- [-h] [-v] [-O0] [-O] [-O1] [-K] [<source file>]

引数の意味は{

### 7.9. {

仮想スタックマシンのニーモニックを出力する{
{\bf 通常は{

仮想スタックマシンのニーモニックは，
コンパイラ内部で用いている中間言語（app:vmページ参照）と，
ほぼ一対一に対応します．
中間言語や仮想スタックマシンを学習したいときに利用します．
{

{\bf 形式 : }~~~vm-c-- [-h] [-v] [-O0] [-O] [-O1] [-K] [<source file>]

引数の意味は{


## 8. 中間言語

一旦，以下で説明する中間言語に変換されます．
その後，中間言語から仮想のスタックマシンや
なお，{を生成するので，
中間言語を用いません．

### 8.1. 仮想スタックマシン

以下では中間言語を変換する先として仮想のスタックマシンを想定します．
仮想スタックマシンの命令は，中間言語から，ほぼ，一対一に変換できます．
仮想スタックマシンは，次のようなものです．

仮想スタックマシンが扱うデータは，基本的にワードデータ(16bit)です．
{cmml}の\int型，参照（アドレス）はワードデータにピッタリ格納されます．

メモリ節約のためバイトデータ(8bit)です．

仮想スタックマシンのプログラムは次の書式のニーモニックで記述します．

```
[ラベル]    [命令   [オペランド[,オペランド]...]]
```


### 8.2. 書式

中間言語は次のような命令行で表現されます．

```
命令([オペランド[,オペランド]...])

例： vmLdCns(3)    // 定数３をスタックに積む
```

### 8.3. 命令

中間言語の命令には「ラベル生成命令」，「マシン命令」，
「マクロ命令」，「擬似命令」があります．

#### 8.3.1. ラベル生成命令

プログラムのジャンプ先やデータのためにラベルを生成します．

##### 8.3.1.1. vmNam

名前を表現するラベルを宣言します．
名前表のidx番目に登録されている名前を
ラベルとして定義するニーモニックを出力します．
ラベルの先頭には'.'または'_'が付加されます．

```
中 間 言 語 ： vmNam(idx)
ニーモニック： ラベル

変換例：vmNam(3)  => .a     // 名前表の３番目に a があった場合
```

##### 8.3.1.2. vmLab

コンパイラが自動的に生成した番号で管理されるラベルを出力します．
このラベルはC-- プログラムソースには存在しない名前です．
整数nで区別できるラベルlnをニーモニックに出力します．

```
中 間 言 語 ： vmLab(n)
ニーモニック： ln

変換例：vmLab(3)  => .L3
```

#### 8.3.2. マシン命令

スタックマシンの命令やTaC の機械語命令に変換されるべき，
中間言語命令です．

##### 8.3.2.1. vmEntry

関数の入口処理をする命令です．
関数内でスコープが切り替わり
同じ領域が複数のローカル変数で共用できる場合があるので，
「{\bf 同時に使用される}ローカル変数の数」が指定されます．

```
中 間 言 語 ： vmEntry(n,idx)
ニーモニック： ラベル  ENTRY   n

変換例：vmEntry(1,3)  => .a  ENTRY  1  // 名前表の３番目にaがあった場合
```

##### 8.3.2.2. vmEntryK

カーネル関数の入口処理をする命令です．
引数の意味はvmEntryと同じです．

```
中 間 言 語 ： vmEntryK(n,idx)
ニーモニック： ラベル  ENTRYK  n

変換例：vmEntryK(1,3) => .a  ENTRYK 1  // 名前表の3番目にaがあった場合
```

##### 8.3.2.3. vmRet

関数の出口処理をする命令です．
ローカル変数を捨てて関数から戻ります．
通常の関数，カーネル関数で共通に使用します．

```
中 間 言 語 ： vmRet()
ニーモニック： RET

変換例：vmRet() => RET
```


##### 8.3.2.4. vmEntryI

引数の意味はvmEntryと同じです．

```
中 間 言 語 ： vmEntryI(n,idx)
ニーモニック： ラベル  ENTRYI  n

変換例：vmEntryI(1,3) => .a  ENTRYI 1 // 名前表の3番目にaがあった場合
```

##### 8.3.2.5. vmRetI

ローカル変数を捨ててinterrupt型関数から戻ります．

```
中 間 言 語 ： vmRetI()
ニーモニック： RETI
```

##### 8.3.2.6. vmMReg

スタックから関数の返り値を取り出し，
返り値用のハードウェアレジスタに移動します．

```
中 間 言 語 ： vmMReg()
ニーモニック： MREG
```

##### 8.3.2.7. vmArg

関数を呼出す前に，関数に渡す引数を準備します．
スタックから値を取り出し引数領域にコピーします．
複数の引数がある場合は，最後の引数から順に処理します．

```
中 間 言 語 ： vmArg()
ニーモニック： ARG
```

以下に二つの引数を持つ関数fを呼び出す例を示します．

```
// C-- ソース
void f(int a, int b) { ... }
void g() { f(1, 2); }

// 関数 g の中間コード
vmEntry(0,5)  // 名前表の５番目に g があるとする
vmLdCns(2)
vmArg()
vmLdCns(1)
vmArg()
vmCallP(2,4)  // 名前表の４番目に f があるとする
vmRet()

// 関数 g のニーモニック
.g
        ENTRY   0
        LDC     2
        ARG
        LDC     1
        ARG
        CALLP   2,.f
        RET
```

##### 8.3.2.8. vmCallP

値を返さない関数を呼び出します．

```
中 間 言 語 ： vmCallP(n,idx)
ニーモニック： CALLP n,ラベル

変換例：vmCallP(2, 4) => CALLP 2,.f  // 名前表の４番目に f があるとする
```

##### 8.3.2.9. vmCallF

値を返す関数を呼び出します．
返り値をハードウェアレジスタから取り出しスタックに積みます．

```
中 間 言 語 ： vmCallF(n,idx)
ニーモニック： CALLF n,ラベル

変換例：vmCallF(2, 4) => CALLF 2,.f  // 名前表の４番目に f があるとする
```

##### 8.3.2.10. vmJmp

無条件ジャンプ命令です．
整数nはジャンプ先ラベルの番号を表します．
ラベルlnはvmLabで出力されるn番目のラベルです．

```
中 間 言 語 ： vmJmp(n)
ニーモニック： JMP   ln

変換例：vmJmp(3) => JMP .L3
```

##### 8.3.2.11. vmJT

スタックから論理値を取り出しtrueならジャンプします．

```
中 間 言 語 ： vmJT(n)
ニーモニック： JT   ln

変換例：vmJT(3) => JT  .L3
```

##### 8.3.2.12. vmJF

スタックから論理値を取り出しfalseならジャンプします．

```
中 間 言 語 ： vmJF(n)
ニーモニック： JF   ln

変換例：vmJF(3) => JF  .L3
```

##### 8.3.2.13. vmLdCns

定数cをスタックに積みます．

```
中 間 言 語 ： vmLdCns(c)
ニーモニック： LDC   c

変換例：vmLdCns(3) => LDC  3
```

##### 8.3.2.14. vmLdGlb

グローバル変数の値をスタックに積みます．

```
中 間 言 語 ： vmLdGlb(idx)
ニーモニック： LDG   ラベル

変換例：vmLdGlb(3) => LDG .a     // 名前表の３番目に a があった場合
```

##### 8.3.2.15. vmLdLoc

ローカル変数の番号は1から始まります．

```
中 間 言 語 ： vmLdLoc(n)
ニーモニック： LDL  n   

変換例：vmLdLoc(3) => LDL  3
```

##### 8.3.2.16. vmLdPrm

現在の関数のn番目の引数の値をスタックに積みます．
引数の番号は第１引数から順に，1以上の番号が割り振られます．

```
中 間 言 語 ： vmLdPrm(n)
ニーモニック： LDP  n   

変換例：vmLdPrm(3) => LDP  3
```

##### 8.3.2.17. vmLdLab

ラベルの参照（アドレス）をスタックに積みます．
整数nはラベルの番号を表します．
ラベルlnはvmLabで出力されるn番目のラベルです．

```
中 間 言 語 ： vmLdLab(n)
ニーモニック： LDC  ln   

変換例：vmLdLab(3) => LDC  .L3
```

##### 8.3.2.18. vmLdNam

名前の参照（アドレス）をスタックに積みます．

```
中 間 言 語 ： vmLdNam(idx)
ニーモニック： LDC  ラベル

変換例：vmLdNam(3) => LDC  .a     // 名前表の３番目に a があった場合
```

##### 8.3.2.19. vmLdWrd

ワード配列の要素を読み出すための命令です．
まずスタックから，添字，ワード配列のアドレスの順に取り出します．
次にワード配列の要素の内容をスタックに積みます．

```
中 間 言 語 ： vmLdWrd()
ニーモニック： LDW
```

##### 8.3.2.20. vmLdByt

バイト配列の要素を読み出すための命令です．
まずスタックから，添字，バイト配列のアドレスの順に取り出します．
次にバイト配列の要素の内容をワードに変換してスタックに積みます．
変換はバイトデータの上位に0のビットを付け加えることで行います．

```
中 間 言 語 ： vmLdByt()
ニーモニック： LDB
```

##### 8.3.2.21. vmStGlb

スタックトップの値をグローバル変数にストアします．
スタックをポップしません．

```
中 間 言 語 ： vmStGlb(idx)
ニーモニック： STG   ラベル

変換例：vmStGlb(3) => STG .a     // 名前表の３番目に a があった場合
```

##### 8.3.2.22. vmStLoc

スタックトップの値をn番目のローカル変数にストアします．
スタックをポップしません．

```
中 間 言 語 ： vmStLoc(n)
ニーモニック： STL   n

変換例：vmStLoc(3) => STL 3
```

##### 8.3.2.23. vmStPrm

スタックトップの値をn番目の引数にストアします．
スタックをポップしません．

```
中 間 言 語 ： vmStPrm(n)
ニーモニック： STP  n   

変換例：vmStPrm(3) => STP  3
```

##### 8.3.2.24. vmStWrd

ワード配列の要素を書き換える命令です．
まずスタックから，添字，ワード配列のアドレスの順に取り出します．
次にスタックトップの値をワード配列の要素に書き込みます．
後半ではスタックをポップしません．

```
中 間 言 語 ： vmStWrd()
ニーモニック： STW
```

##### 8.3.2.25. vmStByt

バイト配列の要素を書き換える命令です．
まずスタックから，添字，バイト配列のアドレスの順に取り出します．
次にスタックトップの値をバイトデータに変換して配列に書き込みます．
後半ではスタックをポップしません．
変換はワードデータの下位8bitを取り出すことで行います．

```
中 間 言 語 ： vmStByt()
ニーモニック： STB
```

##### 8.3.2.26. vmNeg

まず，スタックから整数を取り出し２の補数を計算します．
次に，計算結果をスタックに積みます．

```
中 間 言 語 ： vmNeg()
ニーモニック： NEG
```

##### 8.3.2.27. vmNot

まず，スタックから論理値を取り出し否定を計算します．
次に，計算結果をスタックに積みます．

```
中 間 言 語 ： vmNot()
ニーモニック： NOT
```

##### 8.3.2.28. vmBNot

まず，スタックから整数を取り出し１の補数を計算します．
次に，計算結果をスタックに積みます．

```
中 間 言 語 ： vmBNot()
ニーモニック： BNOT
```

##### 8.3.2.29. vmChr

まず，スタックから整数を取り出し下位8bitだけ残しマスクします．
次に，計算結果をスタックに積みます．

```
中 間 言 語 ： vmChr()
ニーモニック： CHR
```

##### 8.3.2.30. vmBool

まず，スタックから整数を取り出し最下位ビットだけ残しマスクします．
次に，計算結果をスタックに積みます．

```
中 間 言 語 ： vmBool()
ニーモニック： BOOL
```

##### 8.3.2.31. vmAdd

まず，スタックから整数を二つ取り出し和を計算します．
次に，計算結果をスタックに積みます．

```
中 間 言 語 ： vmAdd()
ニーモニック： ADD
```

##### 8.3.2.32. vmSub

まず，スタックから整数を一つ取り出し$x$とします．
次に，スタックから整数をもう一つ取り出し$y$とします．
最後に，スタックに$x-y$を積みます．

```
中 間 言 語 ： vmSub()
ニーモニック： SUB
```

##### 8.3.2.33. vmShl

まず，スタックからシフトするビット数，シフトされるデータの順に取り出します．
次に，左シフトを計算します．
最後に，計算結果をスタックに積みます．

```
中 間 言 語 ： vmShl()
ニーモニック： SHL
```

##### 8.3.2.34. vmShr

まず，スタックからシフトするビット数，シフトされるデータの順に取り出します．
次に，{\bf 算術}右シフトを計算します．
最後に，計算結果をスタックに積みます．

```
中 間 言 語 ： vmShr()
ニーモニック： SHR
```

##### 8.3.2.35. vmBAnd

まず，スタックから整数を二つ取り出しビット毎の論理積を計算します．
次に，計算結果をスタックに積みます．

```
中 間 言 語 ： vmBAnd()
ニーモニック： BAND
```

##### 8.3.2.36. vmBXor

まず，スタックから整数を二つ取り出しビット毎の排他的論理和を計算します．
次に，計算結果をスタックに積みます．

```
中 間 言 語 ： vmBXor()
ニーモニック： BXOR
```

##### 8.3.2.37. vmBOr

まず，スタックから整数を二つ取り出しビット毎の論理和を計算します．
次に，計算結果をスタックに積みます．

```
中 間 言 語 ： vmBOr()
ニーモニック： BOR
```

##### 8.3.2.38. vmMul

まず，スタックから整数を二つ取り出し積を計算します．
次に，計算結果をスタックに積みます．

```
中 間 言 語 ： vmMul()
ニーモニック： MUL
```

##### 8.3.2.39. vmDiv

まず，スタックから整数を一つ取り出し$x$とします．
次に，スタックから整数をもう一つ取り出し$y$とします．
最後に，スタックに$x \div y$を積みます．

```
中 間 言 語 ： vmDiv()
ニーモニック： DIV
```

##### 8.3.2.40. vmMod

まず，スタックから整数を一つ取り出し$x$とします．
次に，スタックから整数をもう一つ取り出し$y$とします．
最後に，スタックに$x$を$y$で割った余りを積みます．

```
中 間 言 語 ： vmMod()
ニーモニック： MOD
```

##### 8.3.2.41. vmGt

まず，スタックから整数を一つ取り出し$x$とします．
次に，スタックから整数をもう一つ取り出し$y$とします．
最後に，比較($x > y$)の結果(論理値)をスタックに積みます．

```
中 間 言 語 ： vmGt()
ニーモニック： GT
```

##### 8.3.2.42. vmGe

まず，スタックから整数を一つ取り出し$x$とします．
次に，スタックから整数をもう一つ取り出し$y$とします．
最後に，比較($x \ge y$)の結果(論理値)をスタックに積みます．

```
中 間 言 語 ： vmGe()
ニーモニック： GE
```

##### 8.3.2.43. vmLt

まず，スタックから整数を一つ取り出し$x$とします．
次に，スタックから整数をもう一つ取り出し$y$とします．
最後に，比較($x < y$)の結果(論理値)をスタックに積みます．

```
中 間 言 語 ： vmLt()
ニーモニック： LT
```

##### 8.3.2.44. vmLe

まず，スタックから整数を一つ取り出し$x$とします．
次に，スタックから整数をもう一つ取り出し$y$とします．
最後に，比較($x \le y$)の結果(論理値)をスタックに積みます．

```
中 間 言 語 ： vmLe()
ニーモニック： LE
```

##### 8.3.2.45. vmEq

まず，スタックから整数を一つ取り出し$x$とします．
次に，スタックから整数をもう一つ取り出し$y$とします．
最後に，比較($x = y$)の結果(論理値)をスタックに積みます．

```
中 間 言 語 ： vmEq()
ニーモニック： EQ
```

##### 8.3.2.46. vmNe

まず，スタックから整数を一つ取り出し$x$とします．
次に，スタックから整数をもう一つ取り出し$y$とします．
最後に，比較($x \neq y$)の結果(論理値)をスタックに積みます．

```
中 間 言 語 ： vmNe()
ニーモニック： NE
```

##### 8.3.2.47. vmPop

スタックから値を一つ取り出し捨てます．

```
中 間 言 語 ： vmPop()
ニーモニック： POP
```

#### 8.3.3. マクロ命令

コード生成にヒントを与えるために，
ニーモニックに対応するレベルまで展開しないで，
マクロ命令として中間コードを出力する場合があります．

##### 8.3.3.1. vmBoolOR

論理OR式の最後で計算結果の論理値をスタックに積むマクロ命令です．
整数n1，n2，n3はラベルの番号を表します．
論理式の途中からtrue，falseが定まった時点で
マクロを展開したニーモニック中のn1，

```
中 間 言 語 ： vmBoolOR(n1, n2, n3)
ニーモニック： 以下のように展開されます

vmBoolOR(1, 2, 3)  | vmBoolOR(1, -1, 3)
-------------------+--------------------
      JMP   .L3    |      JMP   .L3
.L1                | .L1
      LDC   1      |      LDC   1
      JMP   .L3    | .L3
.L2                |
      LDC   0      |
.L3                |
```

##### 8.3.3.2. vmBoolAND

論理AND式の最後で計算結果の論理値をスタックに積むマクロ命令です．

```
中 間 言 語 ： vmBoolAND(n1, n2, n3)
ニーモニック： 以下のように展開されます

vmBoolAND(1, 2, 3) | vmBoolAND(1, -1, 3)
-------------------+--------------------
      JMP   .L3    |      JMP   .L3
.L1                | .L1
      LDC   0      |      LDC   0
      JMP   .L3    | .L3
.L2                |
      LDC   1      |
.L3                |
```

#### 8.3.4. 擬似命令

データ生成用の疑似命令です．

##### 8.3.4.1. vmDwName

名前へのポインタを生成します．

```
中 間 言 語 ： vmDwName(idx)
ニーモニック： DW  ラベル

変換例：vmDwName(3) => DW .a     // 名前表の３番目に a があった場合
```

##### 8.3.4.2. vmDwLab

整数nはラベルの番号を表します．
ラベルlnはvmLabで出力されるn番目のラベルです．

```
中 間 言 語 ： vmDwLab(n)
ニーモニック： DW  ln   

変換例：vmDwLab(3) => DW  .L3
```

##### 8.3.4.3. vmDwCns

ワードデータを生成します．
整数cは生成するデータの値です．

```
中 間 言 語 ： vmDwCns(c)
ニーモニック： DW  c   

変換例：vmDwCns(3) => DW  3
```

##### 8.3.4.4. vmDbCns

バイトデータを生成します．
整数cは生成するデータの値です．

```
中 間 言 語 ： vmDbCns(c)
ニーモニック： DB  c   

変換例：vmDbCns(3) => DB  3
```

##### 8.3.4.5. vmWs

ワードデータ領域（配列）を生成します．
整数nは生成するワードの数です．

```
中 間 言 語 ： vmWs(n)
ニーモニック： WS  n

変換例：vmWs(3) => WS  3
```

##### 8.3.4.6. vmBs

バイトデータ領域（配列）を生成します．
整数nは生成するバイトの数です．

```
中 間 言 語 ： vmBs(n)
ニーモニック： BS  n

変換例：vmWs(3) => BS  3
```

##### 8.3.4.7. vmStr

文字列を生成します．

```
中 間 言 語 ： vmStr(str)
ニーモニック： STRING str

変換例：vmStr("hello\n") => STRING "hello\n"
```


~
##### 8.3.4.8. 変更履歴
2023年08月20日 v.4.4.0  char → int の自動型変換を導入 
2021年03月18日 v.3.3.0  トランスレータ版の実行時エラーチェックを正式導入 
2020年12月11日 v.3.2.9  TTYCTL_MODE_NBLOCK追記 
2020年06月30日 v.3.2.3  カレントディレクトリ追記 
2019年12月10日 v.3.2.2  環境変数ライブラリ追記，Statシステムコール追記 
2019年10月18日 v.3.2.1  conRead/WriteをttyRead/Writeに変更,ttyCtlを追記 
2019年03月24日 v.3.2.0  トランスレータ版に実行時エラーチェックを試験的に導入 
2019年01月27日 v.3.1.12 メモリ保護違反,I/O特権モード,in(),out(),htoi()追記 
2018年11月18日 V.3.1.11 fsize、fseek、printf("
2018年01月27日 V.3.1.10 ドライバの -nostdinc -I オプションを追記 
2016年10月09日 V.3.1.7 cm2iの記述を追加、文法まとめを改良 
2016年09月18日 V.3.1.6 中間言語の仕様を変更 
2016年09月10日 V.3.1.2a 文字列クラス分類関数にトランスレータの場合を追記 
2016年08月13日 C-- V.3.1.2 用(feofの仕様変更)  
2016年06月03日 C-- V.3.1.0 用作成  
2016年03月15日 C-- V.3.0.0 用作成  


##### 8.3.4.9. 対応ソフトウェアのバージョン
{\tt C--}      & Ver.4.0.0 
{\tt TacOS}    & Ver.4.0.2 

　発行年月　２０２３年８月　Ver. 4.0.0 
　著　　者　重村　哲至 
　発　　行　独立行政法人国立高等専門学校機構 
　　　　　　徳山工業高等専門学校 
　　　　　　情報電子工学科 
　　　　　　〒745-8585 山口県周南市学園台 
　　　　　　sigemura@tokuyama.ac.jp 
}}
