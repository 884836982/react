const proxy=require("http-proxy-middleware");
module.exports = (app)=>{
    app.use(proxy("/admin",{
        target:"http://121.36.255.210:8080",
        changeOrigin:true
    }))
}