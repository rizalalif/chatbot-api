import Application from "@ioc:Adonis/Core/Application"
import Event from "@ioc:Adonis/Core/Event"
import Logger from "@ioc:Adonis/Core/Logger"

/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
if (Application.inDev) {
    Event.on('db:query', (query) => {
        // Log query SQL mentahnya
        Logger.info(query.sql)
        // Log nilai-nilai yang diikat ke query
        // Logger.info(query.bindings)
        // Log durasi eksekusi query
        Logger.info(`Query duration: ${query.duration}ms`)
        Logger.info('---------------------------------')
    })
}