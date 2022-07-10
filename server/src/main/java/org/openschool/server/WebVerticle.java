package org.openschool.server;

import java.util.Map;
import java.util.stream.StreamSupport;

import io.vertx.ext.auth.JWTOptions;
import io.vertx.ext.auth.jwt.JWTAuth;
import io.vertx.ext.auth.jwt.JWTAuthOptions;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.Promise;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.client.WebClient;
import io.vertx.ext.web.codec.BodyCodec;
import io.vertx.ext.web.handler.CorsHandler;
import io.vertx.ext.web.handler.JWTAuthHandler;
import io.vertx.ext.web.handler.LoggerHandler;

public class WebVerticle extends AbstractVerticle {

  private final JsonObject config;

  public WebVerticle(JsonObject config) {
    this.config = config;
  }

  @Override
  public void start() {
    setupJwtAuth()
        .compose(this::setupRouter)
        .compose(this::startServer)
        .onFailure(t -> vertx.setTimer(1000L, i -> start()));
  }

  private Future<JWTAuth> setupJwtAuth() {
    var webClient = WebClient.create(vertx);

    var keycloakConfig = config.getJsonObject("keycloak");
    var kcHostname = keycloakConfig.getString("hostname");
    var kcPort = keycloakConfig.getInteger("port");
    var kcRealm = keycloakConfig.getString("realm");
    var issuer = keycloakConfig.getString("issuer");

    return webClient.get(kcPort, kcHostname, "/auth/realms/" + kcRealm + "/protocol/openid-connect/certs")
        .as(BodyCodec.jsonObject())
        .send()
        .compose(response -> {
          var jwksResponse = response.body();
          var keys = jwksResponse.getJsonArray("keys");
          if (keys == null) {
            return Future.failedFuture("");
          }

          // Configure JWT validation options
          var jwtOptions = new JWTOptions()
              .setIssuer(issuer);

          // extract JWKS from keys array
          var jwks = StreamSupport.stream(keys.spliterator(), false)
              .map(JsonObject::mapFrom)
              .toList();

          // configure JWTAuth
          var jwtAuthOptions = new JWTAuthOptions()
              .setJwks(jwks)
              .setJWTOptions(jwtOptions);

          var jwtAuth = JWTAuth.create(vertx, jwtAuthOptions);
          return Future.succeededFuture(jwtAuth);
        });
  }

  private Future<Router> setupRouter(JWTAuth auth) {
    var router = Router.router(vertx);
    router.route().handler(CorsHandler.create("http://localhost:8000"));

    router.route().handler(JWTAuthHandler.create(auth));
    router.route().handler(LoggerHandler.create());

    router.get("/info").handler(this::handleInfo);
    return Future.succeededFuture(router);
  }

  private Future<Void> startServer(Router router) {
    return vertx.createHttpServer()
        .requestHandler(router)
        .listen(config.getJsonObject("http").getInteger("port"))
        .mapEmpty();
  }

  private void handleInfo(RoutingContext ctx) {
    ctx.json(new JsonObject(Map.of("schoolName", "Waldorf Schule")));
  }
}
