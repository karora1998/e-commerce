package testutils;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class DataConverter {


    public static  <T> List convertRestResponseToListOf(List<Object> entries, Class<T> responseTypeClass) {
        final ObjectMapper mapper = new ObjectMapper();
        return entries.stream()
                .map(entry->mapper.convertValue(entry, responseTypeClass))
                .collect(Collectors.toList());

    }

    public static  <T> List<T> convertSetToList(Set<T> values) {

        if(null == values)
            return null;

        List<T> list = new ArrayList<>();
        list.addAll(values);
        return list;
    }


}
