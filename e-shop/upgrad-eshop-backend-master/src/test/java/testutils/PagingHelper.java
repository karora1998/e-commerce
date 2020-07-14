package testutils;

import org.springframework.data.domain.Pageable;

public class PagingHelper {

    public static String getFirstSortedProperty(Pageable pageable) {
             return pageable.getSort().get().findFirst().get().getProperty();
    }
}
