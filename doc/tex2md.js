// 数式内で太字にするには{\bf }, 斜体を解除するには{\rm }

const commands = {};
/*
\newcommand{\tabref}[1]{表~\ref{tab:#1}}
\newcommand{\ver}{Ver. 4.0.0}
\newcommand{\cmm}{{\tt C--}}
\newcommand{\cmml}{\cmm 言語}

「\|array|」
*/
commands["\\tt"] = "";
commands["\\copyright"] = "©";

const repcom = (s) => {
  let state = 0;
  const res = [];
  let cmd = null;
  let param = null;
  for (let i = 0; i < s.length + 1; i++) {
    const c = s[i];
    if (state == 0) {
      if (c == "\\") {
        state = 1;
        cmd = "";
      } else {
        res.push(c);
      }
    } else if (state == 1) {
      if (cmd == "" && c == "\\") {
        res.push("\\");
        state = 0;
      } else if (cmd == "" && c == "|") {
        state = 2;
      } else if (c == "{") {
        state = 3;
        param = "";
      } else if (c == " " || c == "\n" || c === undefined) {
        const w = commands["\\" + cmd];
        //console.log("CMD", cmd, "WW", w)
        if (w) {
          res.push(w + " ");
          state = 0;
        } else {
          res.push("\\" + cmd + " ");
          state = 0;
        }
      } else {
        cmd += c;
      }
    } else if (state == 2) {
      if (c == "|") {
        res.push(cmd);
        state = 0;
      } else {
        cmd += c;
      }
    } else if (state == 3) {
      if (c == "}") {
        //console.log("ST3", cmd, param);
        res.push(repcom(param));
        state = 0;
      } else {
        param += c;
      }
    }
  }
  return res.join("");
};
const parseWord = (s) => {
  s = s.replace(/\{/g, "");
  s = s.replace(/\}/g, "");
  s = s.replace(/\\tt /g, "");
  //console.log("parsew", s)
  return repcom(s);
};

const idx = ['0'.charCodeAt(0), 0, 0, 0]; // chapter, section, subsection, subsubsection

const text2md = async (fn) => {
  const ss = (await Deno.readTextFile(fn)).split("\n");
  const res = [];
  let state = 0;
  for (let s of ss) {
    if (state == 0) {
      const n = s.indexOf("%");
      if (n >= 0) {
        s = s.substring(0, n);
        if (s.length == 0) continue;
      }
      if (s.startsWith("\\include{")) {
        const name = s.substring(9, s.indexOf("}"));
        const md = await text2md(name + ".tex");
        res.push(md);
      } else if (s.startsWith("\\author{")) {
        const author = s.substring("\\author{".length, s.indexOf("}"));
        res.push("- 著書: " + repcom(author));
      } else if (s.startsWith("\\title{")) {
        const title = s.substring("\\title{".length, s.indexOf("}"));
        res.push("# " + repcom(title));
      } else if (s.startsWith("\\chapter{")) {
        const title = s.substring("\\chapter{".length, s.indexOf("}"));
        res.push("## " + (idx[0] < 'A'.charCodeAt(0) ? "" : "付録 ") + String.fromCharCode(++idx[0]) + ". " + repcom(title));
        idx[1] = 0;
      } else if (s.startsWith("\\section{")) {
        const title = s.substring("\\section{".length, s.indexOf("}"));
        res.push("### " + String.fromCharCode(idx[0]) + "." + ++idx[1] + ". " + repcom(title));
        idx[2] = 0;
      } else if (s.startsWith("\\subsection{")) {
        const title = s.substring("\\subsection{".length, s.indexOf("}"));
        res.push("#### " + String.fromCharCode(idx[0]) + "." + idx[1] + "." + ++idx[2] + ". " + repcom(title));
        idx[3] = 0;
      } else if (s.startsWith("\\subsubsection{")) {
        const title = s.substring("\\subsubsection{".length, s.indexOf("}"));
        res.push("##### " + String.fromCharCode(idx[0]) + "." + idx[1] + "." + idx[2] + "." + ++idx[3] + ". " + repcom(title));
      } else if (s.startsWith("\\newcommand{")) {
        const end = s.indexOf("}");
        const name = s.substring("\\newcommand{".length, end);
        //console.log("NAME", name)
        if (s.indexOf("[1]") == -1) {
          const word = parseWord(s.substring(end + 1));
          commands[name] = word;
        }
        // \newcommand{\figref}[1]{図~\ref{fig:#1}}
      } else if (s == "\\begin{verbatim}") {
        res.push("```");
        state = 1;
      } else if (s == "\\appendix") {
        idx[0] = 'A'.charCodeAt(0) - 1;
      } else if (s.startsWith("\\")) {
      } else {
        s = repcom(s);
        //console.log(s);
        res.push(s);
      }
    } else if (state == 1) { // verbatim
      if (s == "\\end{verbatim}") {
        res.push("```");
        state = 0;
      } else {
        res.push(s);
      }
    }
  }
  return res.join("\n");
};

const s = await text2md("./cmm.tex");
await Deno.writeTextFile("cmm.md", s);
