package testutils;


import com.upgrad.eshop.auth.models.LoginResponse;
import com.upgrad.eshop.product.Product;
import com.upgrad.eshop.product.ProductService;
import com.upgrad.eshop.product.search.SearchRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import javax.annotation.PostConstruct;

import static com.upgrad.eshop.auth.models.LoginRequest.createLoginRequestWith;
import static testutils.HttpEntityBuilder.*;


public class IntegrationTestRunner {


    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;


    @Autowired
    public ProductService productService;


    @PostConstruct
    public void setup() {
        restTemplate.getRestTemplate().setErrorHandler(new RestApiClientErrorHandler());
    }

    private String getBaseUrl() {
        return "http://localhost:" + port;
    }


    public <T> T getAsObject(final String url, final Class<T> responseTypeClass ) {


        try {
            final ResponseEntity<T> entity = callRestAPIWithGETMethod(url, responseTypeClass);
            return entity.getBody();
        } catch (final Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex.getMessage());
        }
    }

  public  <T> T getAsObjectwithToken(final String url, final String token, final Class<T> responseTypeClass, final Object... parameters) {
        try {

            final ResponseEntity<T> entity = callRestAPIWithGETMethodWithToken(url, token, responseTypeClass, parameters);
            return entity.getBody();
        } catch (final Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex.getMessage());
        }
    }





    public <T,R> T putWithToken(final String url, final String token, final Class<T> responseTypeClass, R objectToPost) {
        try {
            HttpHeaders headers = getHttpHeaders(token);
            HttpEntity<R> requestEntity = new HttpEntity<R>(objectToPost, headers);

            ResponseEntity<T> response = restTemplate.exchange(constructApiUrl(url), HttpMethod.PUT, requestEntity, responseTypeClass);

            return response.getBody();
        } catch (final Throwable ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex.getMessage());

        }

    }

    public <T,R> T deleteWithToken(final String url, final String token, final Class<T> responseTypeClass, R objectToPost) {
        try {
            HttpHeaders headers = getHttpHeaders(token);
            HttpEntity<R> requestEntity = new HttpEntity<R>(objectToPost, headers);

            ResponseEntity<T> response = restTemplate.exchange(constructApiUrl(url), HttpMethod.DELETE, requestEntity, responseTypeClass);

            return response.getBody();
        } catch (final Throwable ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex.getMessage());

        }

    }

    public <T> T postEntityWithToken(final String url, final String token, final Class<T> responseTypeClass, final Object objectToPost) {
        try {
            final HttpEntity requestEntity = createHttpEntityWithToken(objectToPost, token);
            final ResponseEntity<T> entity = restTemplate.postForEntity(constructApiUrl(url), requestEntity, responseTypeClass);
            return entity.getBody();
        } catch (final Throwable ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex.getMessage());

        }

    }

    public <T> T postEntity(final String url, final Class<T> responseTypeClass, final Object objectToPost) {

        return postEntityWithToken(url,null,responseTypeClass,objectToPost);


    }

    private <T> ResponseEntity<T> callRestAPIWithGETMethodWithToken(String url, final String token, Class<T> responseTypeClass, Object[] parameters) {
        final HttpEntity requestEntity = createHttpGetEntityWithToken(token);
        return restTemplate.exchange(constructApiUrl(url), HttpMethod.GET, requestEntity, responseTypeClass,
                parameters);
    }

    private <T> ResponseEntity<T> callRestAPIWithGETMethod(String url, Class<T> responseTypeClass) {
        final HttpEntity requestEntity = createHttpGetEntity();
        return restTemplate.exchange(constructApiUrl(url), HttpMethod.GET, requestEntity, responseTypeClass,
                "");
    }

    private String constructApiUrl(String url) {
        return getBaseUrl() + url;
    }





}