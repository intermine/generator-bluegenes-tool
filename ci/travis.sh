echo "#--- generating sample tool"
npm link # sets this repo up as a global dependency
# print a bunch of dummy responses to the generator.
# We're using the test model which is non-biological
# and testing on the Employee report page.
printf 'Employee\nEmployee\nEmployee\nEmployee\n\n\nEmployee\n\n\n\n' | yo @intermine/bluegenes-tool

npm run build

echo "#--- copy tool to bluegenes tool dir"
mv Employee ../bluegenes/tools/node_modules/@intermine/Employee

echo "#--- Run UI test"
npx cypress run
