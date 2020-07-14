package testutils;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;

public class TestPage<T> extends PageImpl<T> {

    private static final long serialVersionUID = 3248189030448292002L;

    public TestPage(List<T> content, Pageable pageable, long total) {
        super(content, pageable, total);

    }

    public TestPage(List<T> content) {
        super(content);

    }

    public TestPage() {
        super(new ArrayList<T>());
    }

}