import os
import re

def extract(tag, text):
    pattern = rf"<{tag}>(.*?)</{tag}>"
    match = re.search(pattern, text, re.DOTALL)
    if match:
        return match.group(1).strip()
    return None
def fallback_game():
    return {
        "html": """<!DOCTYPE html>
<html>
<head>
<title>Block Dodger</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<canvas id="game" width="600" height="400"></canvas>
<script src="game.js"></script>
</body>
</html>""",
        "css": """body { background:#111; color:white; text-align:center; }
canvas { background:#222; margin-top:20px; }""",
        "js": """const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");
let player={x:280,y:360,w:40,h:20};
let blocks=[];
let score=0;
document.addEventListener("keydown",e=>{
 if(e.key==="ArrowLeft") player.x-=20;
 if(e.key==="ArrowRight") player.x+=20;
});
function spawn(){blocks.push({x:Math.random()*560,y:0,w:40,h:20});}
setInterval(spawn,800);
function loop(){
 ctx.clearRect(0,0,600,400);
 ctx.fillStyle="white";
 ctx.fillRect(player.x,player.y,player.w,player.h);
 ctx.fillText("Score: "+score,10,20);
 blocks.forEach(b=>{
  b.y+=3;
  ctx.fillRect(b.x,b.y,b.w,b.h);
  if(b.y>400){score++; b.y=0;}
  if(b.x<player.x+player.w && b.x+b.w>player.x && b.y<player.y+player.h && b.y+b.h>player.y){
    alert("Game Over! Score: "+score);
    location.reload();
  }
 });
 requestAnimationFrame(loop);
}
loop();"""
    }

def save_files(output):
    html = extract("index.html", output)
    css = extract("style.css", output)
    js = extract("game.js", output)

    if not html or not css or not js:
        raise ValueError("Model output structure invalid.")

    os.makedirs("output", exist_ok=True)

    with open("output/index.html", "w", encoding="utf-8") as f:
        f.write(html)

    with open("output/style.css", "w", encoding="utf-8") as f:
        f.write(css)

    with open("output/game.js", "w", encoding="utf-8") as f:
        f.write(js)

    print("✅ Clean files written to output/")