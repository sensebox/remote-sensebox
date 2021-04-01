# remote-sensebox

raspbian lite image für den raspberry pi: https://downloads.raspberrypi.org/raspios_lite_armhf/images/raspios_lite_armhf-2021-01-12/2021-01-11-raspios-buster-armhf-lite.zip

---
stream 
-----------------------------
* * `sudo apt-get update -y && sudo apt-get upgrade -y`
* im `raspi-config` kamera aktivieren
* reboot
* `sudo apt install git libevent-dev libjpeg8-dev libbsd-dev -y `
* `git clone --depth=1 https://github.com/pikvm/ustreamer`
* `make -C ustreamer`
* stream starten: `sudo ./ustreamer/ustreamer --device=/dev/video0 --host=0.0.0.0 --port=80`

mcu
---
* `git clone https://github.com/sensebox/remote-sensebox`
* `cd remote-sensebox`
* `bash setup.sh`
* `<IP-VOM-PI>` in `upload.html` anpassen
* `npm install`
* `node index.js`
