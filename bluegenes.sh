export BLUEGENES_DEFAULT_SERVICE_ROOT=$TESTMODEL_URL
wget https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein -O /tmp/lein
chmod +x /tmp/lein
export PATH=$PATH:/tmp/lein
#start server
lein run &
# install cypress dependencies
sudo apt-get install xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 -y
# setup dependencies
npm install
# Build CSS
lein less once
# ensure a minified build completes without error
lein cljsbuild once min
