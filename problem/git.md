# 设置双账号拉取不同项目
.ssh/config文件，在windows环境配置为
Host github.com
HostName ssh.github.com
User git
Port 443
IdentityFile ~/.ssh/id_rsa_2

# 拉取代码失败报错：1080
git config --global http.proxy
git config --global --unset http.proxy

# 拉取项目报错：
RPC failed；result=18，HTTP code=200 
fatal: early EOFs
fatal: index-pack failed

(1)设置git 全局变量：git config --global [key] [value]
http.postbuffer=524288000
core.packedgitlimit=512m
core.packedgitwindowsize=512m
core.compression=-1
pack.deltacachesize=2047m
pack.packsizelimit=2047m
pack.windowmemory=2047m
credential.helper=cache --timeout=3600
(2)尝试使用ssh/http方式拉取
(3)
git config --global core.compression 0
git clone --depth 1 <repo_URI>
When that works, go into the new directory and retrieve the rest of the clone: 
git fetch --unshallow 
or, alternately, 
git fetch --depth=2147483647
Now, do a regular pull: 
git pull --all