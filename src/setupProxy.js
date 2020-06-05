const proxy=require("http-proxy-middleware");
module.exports = (app)=>{
    app.use(proxy("/admin",{
        target:"http://localhost:8080",
        changeOrigin:true
    }))
}