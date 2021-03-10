# remote-sensebox

raspbian lite image für den raspberry pi: https://downloads.raspberrypi.org/raspios_lite_armhf/images/raspios_lite_armhf-2021-01-12/2021-01-11-raspios-buster-armhf-lite.zip

---

1. per ssh mit pi verbinden
2. `sudo apt-get update -y && sudo apt-get upgrade -y`
3. `sudo apt install git -y` & `git clone https://github.com/sensebox/remote-sensebox`
4. `cd remote-sensebox`
5. `bash setup.sh`
6. `<IP-VOM-PI>` in `upload.html` anpassen (`ifconfig`)
7. `npm install`
8. `node index.js`
