# BLOCKSIFY
## PROJECT IS ARCHIVED

Interactive web app, build using Three js, React and MobX


<img src="./public/meta/screen_0.3.0.png?raw=true" width="834" height="478" alt="Screenshot from v0.3.0"/>


## Starting application
- install deps
```bash
npm i
```

- start dev mode
```bash
npm run dev
```

-build and start
```bash
npm run build-stage
npm run start
```

### With Docker
Install docker.io и docker-compose

```bash
apt update -y && apt install -y  docker.io docker-compose
```

Sometimes additional *daemon.json* in the folder **/etc/docker** has to be created to adress issues:
- alpine repository fetch error (DNS)
- fecth infinite stuck (mtu)
```json
 { "dns" : [ "114.114.114.114" , "8.8.8.8" ], "mtu": 1000 } 
```


Build image (--verbose - to show logs)
```bash
docker-compose build blocksify-app-stage
```

Start in detached mode
```bash
docker-compose up -d blocksify-app-stage
```

Stopping services
```bash
docker-compose down
```

***
### Take a look!
Here is a youtube playlist with stuff related to project. For now it's a kind of video changelog with short demonstartion of new features: **https://www.youtube.com/playlist?list=PLyZzwvxb6x4tu-kgVjANIEQV9GDtxixIi**


