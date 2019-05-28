#tell bluegenes which intermine to query
export BLUEGENES_DEFAULT_SERVICE_ROOT=$TESTMODEL_URL

echo "#--- installing lein"
#download and install lein
wget https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein -O /tmp/lein
chmod +x /tmp/lein
export PATH=$PATH:/tmp/lein

echo "#--- cloning bluegenes"
git clone --single-branch --branch 'dev' --depth 1 https://github.com/intermine/bluegenes.git bluegenes

cd bluegenes
npm install

echo "#--- starting bluegenes server"
lein prod
# install cypress dependencies
sudo apt-get install xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 -y
# setup dependencies
