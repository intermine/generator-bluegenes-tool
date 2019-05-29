# Generate a new tool.
# ------------
# Pipes the word "Employee" to all of the yeoman responses
# ensuring we have some default input for the tool
# as well as a valid object class for which pages to
# show this on.

echo "#--- generating sample tool"
yes "Employee" | yo @intermine/bluegenes-tool
npm run build

echo "#--- copy tool to bluegenes tool dir"
mv Employee ../bluegenes/tools/node_modules/@intermine/Employee

echo "#--- Run UI test"
npx cypress run
