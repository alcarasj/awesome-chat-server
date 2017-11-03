if [ $# -eq 0 ]
  then
    echo "No arguments supplied."
    echo "USAGE: start.sh PORT_NUMBER"
fi
start server-win.exe $1
exit
