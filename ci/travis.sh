echo "#--- generating sample tool"
npm link # sets this repo up as a global dependency

mkdir sample_tool
cd sample_tool

# print a bunch of dummy responses to the generator.
# We're using the test model which is non-biological
# and testing on the Employee report page.
while true; do echo "Employee\n"; sleep 0.1s; done | yo @intermine/bluegenes-tool

npm run build

echo "#--- copy tool to bluegenes tool dir"
cd ..
mv sample_tool ../bluegenes/tools/node_modules/@intermine/Employee

echo "#--- Run UI test"
npx cypress run
