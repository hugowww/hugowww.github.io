var f=Object.defineProperty;var p=(s,t,e)=>t in s?f(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var i=(s,t,e)=>p(s,typeof t!="symbol"?t+"":t,e);import{e as d,f as l,j as m,o as u,c as k,a,t as v,_ as w,k as x}from"./index-C4bxKiOZ.js";class S{constructor(t=20){i(this,"state");i(this,"gridCount");i(this,"gameLoop",null);this.gridCount=t,this.state=this.getInitialState()}getInitialState(){return{snake:[{x:3,y:1},{x:2,y:1},{x:1,y:1}],snakeDirection:"right",food:this.generateFood(),score:0,isGameOver:!1}}generateFood(){return{x:Math.floor(Math.random()*this.gridCount),y:Math.floor(Math.random()*this.gridCount)}}moveSnake(t){if(this.state.isGameOver)return;const e={...this.state.snake[0]};switch(t){case"up":e.y--;break;case"down":e.y++;break;case"left":e.x--;break;case"right":e.x++;break}if(this.state.snakeDirection=t,this.checkCollision(e)){this.state.isGameOver=!0,this.stop();return}this.state.snake.unshift(e),e.x===this.state.food.x&&e.y===this.state.food.y?(this.state.score+=10,this.state.food=this.generateFood()):this.state.snake.pop()}checkCollision(t){return t.x<0||t.x>=this.gridCount||t.y<0||t.y>=this.gridCount||this.state.snake.some(e=>e.x===t.x&&e.y===t.y)}getState(){return this.state}start(){this.state=this.getInitialState(),this.gameLoop=window.setInterval(()=>{this.moveSnake(this.state.snakeDirection)},150)}stop(){this.gameLoop&&(clearInterval(this.gameLoop),this.gameLoop=null)}}class _{constructor(t,e=20){i(this,"canvas");i(this,"ctx");i(this,"gridSize");this.canvas=t,this.ctx=t.getContext("2d"),this.gridSize=t.width/e}render(t){this.clear(),this.drawSnake(t.snake),this.drawFood(t.food)}clear(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)}drawSnake(t){this.ctx.fillStyle="#4CAF50",t.forEach(e=>{this.ctx.fillRect(e.x*this.gridSize,e.y*this.gridSize,this.gridSize-1,this.gridSize-1)})}drawFood(t){this.ctx.fillStyle="#FF5722",this.ctx.fillRect(t.x*this.gridSize,t.y*this.gridSize,this.gridSize-1,this.gridSize-1)}}class y{constructor(t){i(this,"currentDirection","right");i(this,"onDirectionChange");this.onDirectionChange=t,this.setupEventListeners()}setupEventListeners(){document.addEventListener("keydown",t=>{const e=this.getNewDirection(t.key);e&&this.isValidDirection(e)&&(this.currentDirection=e,this.onDirectionChange(e))})}getNewDirection(t){return{ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right"}[t]||null}isValidDirection(t){return{up:"down",down:"up",left:"right",right:"left"}[t]!==this.currentDirection}}const C={class:"snake-game"},D={class:"controls"},z={class:"score"},F=d({__name:"SnakeGame",setup(s){const t=l(null),e=l(0);let c=null;m(()=>{c&&cancelAnimationFrame(c)});const g=()=>{if(!t.value)return;var r=new S,o=new _(t.value);new y(n=>{r==null||r.moveSnake(n)}),r.start(),e.value=0;const h=()=>{const n=r.getState();o.render(n),e.value=n.score,n.isGameOver||(c=requestAnimationFrame(h))};h()};return(r,o)=>(u(),k("div",C,[o[0]||(o[0]=a("h1",null,"貪食蛇",-1)),a("canvas",{ref_key:"gameCanvas",ref:t,width:"400",height:"400"},null,512),a("div",D,[a("button",{onClick:g},"開始遊戲"),a("div",z,"分數: "+v(e.value),1)])]))}}),L=w(F,[["__scopeId","data-v-93e19bcf"]]),I=d({__name:"PageSnake",setup(s){return(t,e)=>(u(),x(L))}});export{I as default};
