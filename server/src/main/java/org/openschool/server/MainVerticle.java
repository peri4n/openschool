package org.openschool.server;

import io.vertx.config.ConfigRetriever;
import io.vertx.config.ConfigRetrieverOptions;
import io.vertx.config.ConfigStoreOptions;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.Promise;
import io.vertx.core.json.JsonObject;

public class MainVerticle extends AbstractVerticle {

  static record Startup(Promise<Void> bootstrap, JsonObject config) {
  };

  @Override
  public void start(Promise<Void> bootstrap) throws Exception {
    initConfig(bootstrap)
        .compose(this::deployVerticles)
        .onComplete(bootstrap::handle);
  }

  private Future<Startup> initConfig(Promise<Void> bootstrap) {
    var yamlConfigOpts = new ConfigStoreOptions()
        .setFormat("yaml")
        .setType("file")
        .setConfig(new JsonObject().put("path", "config.yaml"));

    var envConfigOptions = new ConfigStoreOptions()
        .setType("env");

    var configRetrieverOpts = new ConfigRetrieverOptions()
        .addStore(yamlConfigOpts)
        .addStore(envConfigOptions);

    var configRetriever = ConfigRetriever.create(vertx, configRetrieverOpts);

    return configRetriever.getConfig()
        .map(config -> new Startup(bootstrap, config));
  }

  private Future<Void> deployVerticles(Startup unused) {
    return vertx.deployVerticle(new WebVerticle(unused.config)).mapEmpty();
  }
}
