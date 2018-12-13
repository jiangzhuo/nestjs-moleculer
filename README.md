# nestjs-moleculer
[Moleculer](https://github.com/moleculerjs/moleculer) Module For [Nestjs](https://github.com/nestjs/nest) Framework

## Why ?

Nestjs and Moleculer are amazing framework for building server-side application. They have different advantages. This module allow bring elegent micoservice API from Moleculer to Nestjs. 

## How ?

This module works like other Nestjs third-party module. You can use it in NestApplication, without creating NestMicroservice instance. 
using `InjectBroker` to inject Moleculer Broker.
using `InjectService` to inject Moleculer Service.

## Install

IMPORTANT: you need Nest > v4.5.10+

```bash
npm install nestjs-moleculer --save
```

OR

```bash
yarn add nestjs-moleculer
```

## Setup

### Init Module

```ts
... //imports
@Module({
    imports: [
          MoleculerModule.forRoot({
              brokerName: "customBrokerName", // if you have multiple broker
              namespace: "yourNameSpace", // some moleculer options
              transporter: "TCP",
              // hotReload: true, // hotReload feature from moleculer will not work 
          })
          OtherModule
    ],
    controllers: [
        homeController, // controller that extrends Moleculer Service
    ],
    // as usual, nothing new
})
export class ApplicationModule {}
```

### Declare Moleculer Service (as controller)

```ts
import { Service, Context, ServiceBroker } from 'moleculer';
import { Inject, Injectable } from '@nestjs/common';
import { HomeService } from "../services/home.service";
import { InjectBroker } from 'nestjs-moleculer';

@Injectable()
export class HomeController extends Service {
    constructor(@InjectBroker() broker: ServiceBroker,
                @Inject(HomeService) private readonly homeService: HomeService
    ) {
        super(broker);

        this.parseServiceSchema({
            name: "home",
            settings: {
                upperCase: true
            },
            actions: {
                sayHello: this.sayHello,
            },
            created: this.serviceCreated,
            started: this.serviceStarted,
            stopped: this.serviceStopped,
        });
    }

    serviceCreated() {
        this.logger.info("home service created.");
    }

    serviceStarted() {
        this.logger.info("home service started.");
    }

    serviceStopped() {
        this.logger.info("home service stopped.");
    }

    async sayHello(ctx: Context) {
        return this.homeService.sayHello(ctx.params.name);
    }
}

```
for more detail of [How to declare Moleculre Service in ES6 Class](https://github.com/moleculerjs/moleculer/blob/d848389105619fe9e588a5a4ce75bb833b2442df/examples/es6.class.service.js)

### Call Service Handler
```ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectBroker } from "nestjs-moleculer";

import { ServiceBroker } from "moleculer";

@Injectable()
export class AppService {
    constructor(
        @InjectBroker() private readonly broker: ServiceBroker,
    ) {
    }

    onModuleInit() {
        setTimeout(() => {
            this.broker.call('home.sayHello', { name: "jiangzhuo" }).then((res) => {
                console.log(res)
            })
        }, 1000)
    }
}


```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
