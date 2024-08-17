<div class="book">
    <div class="edge-left"></div>
    <div class="content-left">
        <slot class="page-content-left z-10" name="page-one">
            
        </slot>
    </div>
    <div class="divider"></div>
    <div class="content-right">
        <slot class="page-content-right z-10" name="page-two">
      
        </slot>
    </div>
    <div class="edge-right">

    </div>
</div>

<style>
    
.book{
  display:grid;
  grid-template-areas: "edge-left content-left divider content-right edge-right";
  height:94vh;
  margin: 2vh;
  padding:0;
  grid-gap:0;
  grid-template-columns: 2% 48% 0.2% 48% 2%;
  box-shadow:0vw 0.2vw 1vw 1vw black;
}
.edge-left{
  grid-area: edge-left;
  background:url('../images/background/book-cover.jpg');
  background-repeat: no-repeat;
  background-size:cover; 
  box-shadow: -0.8vw 0px 0.5vw 0px black inset;
}
.edge-right{
  grid-area:edge-right;
  background:url('../images/background/book-cover.jpg');
  background-repeat: no-repeat;
  background-size:cover; 
}
.content-right{
  grid-area: content-right;
  background-color:blue;
  background:url('../images/background/pages.jpg');
  background-repeat:no-repeat;
  background-size: cover;
  box-shadow:1vw 0px 0.5vw 0px black;
  z-index:1;

}
.content-left{
  grid-area: content-left;
  background-color:blue;
  background:url('../images/background/pages.jpg');
  background-repeat:no-repeat;
  background-size: cover;
  z-index:1;
}
.divider{
  grid-area:divider;
  background:url('../images/background/pages.jpg');
  box-shadow: 0vw 0vw 1.7vw 0.8vw black, 4px 0px 7px 2px black inset, -4px 0px 7px 2px black inset;
  z-index:2;
}


</style>