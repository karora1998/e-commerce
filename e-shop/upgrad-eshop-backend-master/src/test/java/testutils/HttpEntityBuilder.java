package testutils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

public class HttpEntityBuilder {

    private static final Logger log = LoggerFactory.getLogger(HttpEntityBuilder.class);
    public static HttpEntity createHttpEntityWithToken(Object objectToPost, String token) throws JsonProcessingException {
        final ObjectMapper mapper = new ObjectMapper();
        HttpHeaders headers = getHttpHeaders(token);
        String s = mapper.writeValueAsString(objectToPost);
        return new HttpEntity(s, headers);
    }




    public static HttpEntity createHttpGetEntity() {
        return createHttpGetEntityWithToken(null);
    }
    public static HttpEntity createHttpGetEntityWithToken(String token) {
        return new HttpEntity(getHttpHeaders(token));
    }

    public static HttpHeaders getHttpHeaders(String accessToken) {
        HttpHeaders headers = new HttpHeaders();

        if(null != accessToken && accessToken.trim().length() >0)
            headers.set("Authorization", "Bearer "+accessToken);

        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }
}
