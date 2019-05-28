#tell bluegenes which intermine to query
export BLUEGENES_DEFAULT_SERVICE_ROOT=$TESTMODEL_URL

echo "#--- installing lein"
#download and install lein
wget https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein -O /tmp/lein
chmod +x /tmp/lein
export PATH=$PATH:/tmp/lein

echo "#--- cloning bluegenes"
git clone git@github.com:intermine/bluegenes.git
cd bluegenes

echo "#--- starting bluegenes server"
lein run &
# install cypress dependencies
sudo apt-get install xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 -y
# setup dependencies
npm install

echo "#--- building css"
lein less once

echo "#--- building cljs into js, prod minified"
lein cljsbuild once min
