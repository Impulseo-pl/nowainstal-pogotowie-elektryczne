/* NowaInstal - kurtyna wejściowa: logo, iskra w środku, ekran rozjeżdża się na dwie drogi.
   Raz na wizytę (sessionStorage); ?intro gra od nowa. Każda awaria = zwykła strona. */
(function(){
  try{
    var root=document.documentElement, intro=document.querySelector('.intro');
    if(!intro) return;
    var replay=/[?&]intro\b/.test(location.search), seen=false;
    try{ seen=sessionStorage.getItem('ni-intro')==='1'; }catch(e){}
    var reduced=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    if((seen&&!replay)||reduced){ intro.remove(); return; }
    try{ sessionStorage.setItem('ni-intro','1'); }catch(e){}

    root.classList.add('intro-on');
    var done=false, timers=[];
    function finish(){
      if(done) return; done=true;
      timers.forEach(clearTimeout);
      root.classList.add('intro-go','intro-open');
      setTimeout(function(){ root.classList.add('intro-done'); },120);
      setTimeout(function(){ root.classList.remove('intro-on','intro-go','intro-open'); intro.remove(); },1100);
      ['wheel','touchstart','keydown'].forEach(function(ev){ window.removeEventListener(ev,finish); });
    }
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ root.classList.add('intro-go'); }); });
    timers.push(setTimeout(finish,1650));
    timers.push(setTimeout(finish,3500)); /* twardy bezpiecznik */
    intro.addEventListener('click',finish);
    ['wheel','touchstart','keydown'].forEach(function(ev){ window.addEventListener(ev,finish,{passive:true}); });
  }catch(e){
    document.documentElement.classList.remove('intro-on');
    var i=document.querySelector('.intro'); if(i) i.remove();
  }
})();
