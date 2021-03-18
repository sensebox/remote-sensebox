# remote-sensebox

raspbian lite image für den raspberry pi: https://downloads.raspberrypi.org/raspios_lite_armhf/images/raspios_lite_armhf-2021-01-12/2021-01-11-raspios-buster-armhf-lite.zip

---

- mcu

1. per ssh mit pi verbinden
2. `sudo apt-get update -y && sudo apt-get upgrade -y`
3. `sudo apt-get install git -y` & `git clone https://github.com/sensebox/remote-sensebox`
4. `cd remote-sensebox`
5. `bash setup.sh`
6. `<IP-VOM-PI>` in `upload.html` anpassen (`ifconfig`)
7. `npm install`
8. `node index.js`

- stream //qualität sehr schlecht (grund?? cam oder config??)

1. motion installieren `sudo apt-get install motion -y`
2. `v4l2-ctl -V` gibt infos über cam, eventuell reboot nötig
3. in conf datei änderungen `sudo nano /etc/motion/motion.conf`:
  -> `daemon **on**`
  -> `stream_localhost **off**`
  -> `framerate **15**`
  -> `stream_maxrate **15**`
  -> `stream_auth_method 1`
  -> `stream_authentication username:password`
4. `sudo motion start`
5. `<IP-VOM-PI>:8081` für stream
