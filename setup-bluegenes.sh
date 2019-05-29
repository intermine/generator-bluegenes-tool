#tell bluegenes which intermine to query
export BLUEGENES_DEFAULT_SERVICE_ROOT=$TESTMODEL_URL
export BLUEGENES_TOOL_PATH="bluegenes/tools/node_modules"

echo "#--- installing lein"
#download and install lein
wget https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein -O /tmp/lein
chmod +x /tmp/lein
export PATH=$PATH:/tmp/lein

echo "#--- cloning bluegenes"
git clone --single-branch --branch 'dev' --depth 1 https://github.com/intermine/bluegenes.git bluegenes

echo "#--- installing node dependencies"
cd bluegenes
npm install

echo "#--- set up tools folder"
cd tools
mv ../../ci/package.json package.json -f

echo "#--- starting bluegenes server"
lein prod
# setup dependencies
