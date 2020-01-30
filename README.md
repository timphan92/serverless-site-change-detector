# What is it

Utilizing TimerTrigger for Azure functions to scrape a website for its content on a schedule.

## How it works

TimerTrigger works by providing a schedule in the form of a [cron expression](https://en.wikipedia.org/wiki/Cron#CRON_expression)(See the link for full details).

- Change the schedule in function.json (Schedule is default set on every weekday 13.35)
- Simple fetch with axios and use Cheerio-API for traversing the resulting data structure
- I used this to receive mail-notifications when new apartments were announced at a website

## local.settings.json

```
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "DefaultEndpointsProtocol=https;AccountName={STORAGE_ACCOUNT};AccountKey={ACCOUNT_KEY};EndpointSuffix=core.windows.net",
    "FUNCTIONS_WORKER_RUNTIME": "node"
  }
}
```
