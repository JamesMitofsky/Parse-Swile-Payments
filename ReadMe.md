# Setup

## Data collection

1. Using this chrome extension, I recorded all of the Swile traffic to see my account operations: https://chromewebstore.google.com/detail/request-interceptor/nndjakbllljidligkiacmijcdlmooblb

2. After collecting the data, create a `requests.json` file in the `dist` directory. This will be the file your code reads the data from.

# Terminology

I've run across some vocabularly which I'm not familiar with, and since what I'm doing isn't really an intended way of the public engaging with the platform, it's not very well documented. What follows is my best understanding of things:

## VALIDATED
Refers to the confirmation that the transaction request (such as a purchase or a redemption) has been received and verified as syntactically correct and potentially compliant with basic business rules.
## CAPTURED
Indicates that the transaction has been fully processed or completed, often implying that the action (such as payment or voucher redemption) has been successfully executed.