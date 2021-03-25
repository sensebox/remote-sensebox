#!/bin/sh

sudo apt-get update

curl -fsSL https://raw.githubusercontent.com/arduino/arduino-cli/master/install.sh | sh
sudo mv bin/arduino-cli /usr/local/bin
sudo rm -r bin

arduino-cli --additional-urls https://gist.githubusercontent.com/ubergesundheit/112ff5f704e39e3d48c96d691a7031b1/raw/130d3b45a2fffc0a9cb776fadefe03139ae616e2/package_sensebox_index.json core install arduino:samd
arduino-cli --additional-urls https://gist.githubusercontent.com/ubergesundheit/112ff5f704e39e3d48c96d691a7031b1/raw/130d3b45a2fffc0a9cb776fadefe03139ae616e2/package_sensebox_index.json core install sensebox:samd

git clone https://github.com/arduino-libraries/SD /home/pi/.arduino15/packages/sensebox/hardware/samd/1.3.3/libraries/SD

sudo apt-get install nodejs -y

sudo apt-get install npm -y

mkdir uploads
