if [ $# -eq 0 ]
  then
    echo "No arguments supplied."
    echo "USAGE: start.sh PORT_NUMBER"
fi
case "$OSTYPE" in
  solaris*) echo "Solaris is not supported." ;;
  darwin*)  ./server-macos $1 ;; 
  linux*)   ./server-linux $1 ;;
  bsd*)     echo "BSD is not supported." ;;
  msys*)    start server-win.exe $1 ;;
  *)        echo "Unknown: $OSTYPE is not supported." ;;
esac
start server-win.exe $1
exit
