(()=>{var e={274:e=>{e.exports={mongoURI:{production:"mongodb+srv://gideongachie:33813398@gallery.nn9xf.mongodb.net/darkroom?retryWrites=true&w=majority",development:"mongodb+srv://gideongachie:33813398@gallery.nn9xf.mongodb.net/darkroom-dev?retryWrites=true&w=majority",test:"mongodb+srv://gideongachie:33813398@gallery.nn9xf.mongodb.net/darkroom-test?retryWrites=true&w=majority"}}},656:(e,r,t)=>{const o=t(37);var i=new(0,o.Schema)({name:String,path:String,size:Number,date:{type:Date,default:Date()}});let n=o.model("Image",i);e.exports=n},393:(e,r,t)=>{const o=t(252).Router();let i=t(656);o.get("/:id",((e,r)=>{i.findById(e.params.id,(function(e,t){e&&console.log(e),r.render("singleImage",{title:"Single Image",image:t})}))})),o.put("/:id",((e,r)=>{console.log(e.params.id),console.log(e.body),i.findOneAndUpdate({_id:e.params.id},{name:e.body.name},{new:!0},(function(e,t){e&&console.log(e),r.redirect("/")}))})),o.delete("/:id",((e,r)=>{console.log(e.params.id),i.deleteOne({_id:e.params.id},(function(e){e&&console.log(e),r.redirect("/index")}))})),e.exports=o},4:(e,r,t)=>{const o=t(252).Router();t(903);let i=t(79);t(16);let n=t(656);o.get("/",((e,r)=>{n.find({},(function(t,o){t&&console.log(t),r.render("index",{images:o,msg:e.query.msg})}))})),o.post("/upload",((e,r)=>{i(e,r,(t=>{t?r.redirect(`/?msg=${t}`):(console.log(e.file),null==e.file?r.redirect("/?msg=Error: No file selcted!"):(new n({name:e.file.filename,size:e.file.size,path:"images/"+e.file.filename}).save(),r.redirect("/?msg=File uploaded successfully")))}))})),e.exports=o},79:(e,r,t)=>{const o=t(461),i=t(928),n=o.diskStorage({destination:"./public/images/",filename:function(e,r,t){t(null,r.fieldname+"-"+Date.now()+i.extname(r.originalname))}}),s=o({storage:n,limits:{fileSize:1e6},fileFilter:function(e,r,t){!function(e,r){const t=/jpeg|jpg|png|gif/,o=t.test(i.extname(e.originalname).toLowerCase());if(t.test(e.mimetype)&&o)return r(null,!0);r("Error: Images Only!!")}(r,t)}}).single("image");e.exports=s},578:(e,r,t)=>{const o=t(252),i=(t(268),t(37)),n=t(928);t(274);let s=t(4),l=t(393);const a=o();i.connect("mongodb+srv://gideongachie:33813398@gallery.nn9xf.mongodb.net/?retryWrites=true&w=majority&appName=gallerydarkroom",{useNewUrlParser:!0,useUnifiedTopology:!0},(e=>{e&&console.log(e)})),a.set("view engine","ejs"),a.use(o.static(n.join(__dirname,"public"))),a.use(o.json()),a.use("/",s),a.use("/image",l);const g=process.env.PORT||5e3;a.listen(g,(()=>{console.log(`Server is listening at http://localhost:${g}`)})),e.exports=a},268:e=>{"use strict";e.exports=require("body-parser")},252:e=>{"use strict";e.exports=require("express")},37:e=>{"use strict";e.exports=require("mongoose")},461:e=>{"use strict";e.exports=require("multer")},903:e=>{"use strict";e.exports=require("uuid")},928:e=>{"use strict";e.exports=require("path")},16:e=>{"use strict";e.exports=require("url")}},r={};!function t(o){var i=r[o];if(void 0!==i)return i.exports;var n=r[o]={exports:{}};return e[o](n,n.exports,t),n.exports}(578)})();