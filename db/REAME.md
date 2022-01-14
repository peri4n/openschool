# Json-Server

Json-Server is used as a replacement for a REST backend. 
This allows me to focus on the frontend.

## Example Data

The dev deployment of json-server comes prefilled with example data.
This example data is generated via the `file.js`.
You can run json-server prefilled with random data by running:

```sh
json-server file.js
```

I didn't manage to run exactly this command in a Docker environment.
To work around this limitation I took a snapshot of the running json-server.
The generated `data.json` can be easily mounted to a Docker container.
