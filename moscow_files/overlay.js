google.maps.__gjsload__('overlay', function(_){'use strict';var kC=_.oa("b"),lC=_.na(),mC=function(){var a=this.ig;if(this.getPanes()){if(this.getProjection()){if(!a.b&&this.onAdd)this.onAdd();a.b=!0;this.draw()}}else{if(a.b)if(this.onRemove)this.onRemove();else this.remove();a.b=!1}},nC=function(a){a.ig=a.ig||new lC;return a.ig},oC=function(a){_.Rf.call(this);this.Z=(0,_.u)(mC,a)};_.v(kC,_.C);
kC.prototype.changed=function(a){"outProjection"!=a&&(a=!!(this.get("offset")&&this.get("projectionTopLeft")&&this.get("projection")&&_.A(this.get("zoom"))),a==!this.get("outProjection")&&this.set("outProjection",a?this.b:null))};_.v(oC,_.Rf);_.lc("overlay",{Xk:function(a){var b=a.getMap(),c=nC(a),d=c.gn;c.gn=b;d&&(c=nC(a),(d=c.da)&&d.unbindAll(),(d=c.oi)&&d.unbindAll(),a.unbindAll(),a.set("panes",null),a.set("projection",null),_.G(c.T,_.B.removeListener),c.T=null,c.Va&&(c.Va.Z(),c.Va=null),_.en("Ox","-p",a));if(b){c=nC(a);d=c.Va;d||(d=c.Va=new oC(a));_.G(c.T||[],_.B.removeListener);var e=c.da=c.da||new _.wm,f=b.__gm;e.bindTo("zoom",f);e.bindTo("offset",f);e.bindTo("center",f,"projectionCenterQ");e.bindTo("projection",b);e.bindTo("projectionTopLeft",
f);e=c.oi=c.oi||new kC(e);e.bindTo("zoom",f);e.bindTo("offset",f);e.bindTo("projection",b);e.bindTo("projectionTopLeft",f);a.bindTo("projection",e,"outProjection");a.bindTo("panes",f);e=(0,_.u)(d.N,d);c.T=[_.B.addListener(a,"panes_changed",e),_.B.addListener(f,"zoom_changed",e),_.B.addListener(f,"offset_changed",e),_.B.addListener(b,"projection_changed",e),_.B.addListener(f,"projectioncenterq_changed",e),_.B.forward(b,"forceredraw",d)];d.N();b instanceof _.Md&&(_.bn(b,"Ox"),_.dn("Ox","-p",a,!!b.b))}}});});