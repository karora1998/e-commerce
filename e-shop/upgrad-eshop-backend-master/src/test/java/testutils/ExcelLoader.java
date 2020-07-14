package testutils;


import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.spi.LoggingEvent;
import ch.qos.logback.core.Appender;
import com.opencsv.CSVReaderHeaderAware;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.CsvToBeanFilter;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.FileReader;
import java.util.List;
import java.util.Map;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.greaterThan;

public class ExcelLoader {


    private static final Logger log = LoggerFactory.getLogger(ExcelLoader.class);


    @Test
    public void downloadExcelAndConvertToObject() throws Exception{

//        String path="C:\\muthu\\gitworkspace\\upgrad-ecommerce\\dummt.csv";
//        //String path="C:\\muthu\\gitworkspace\\upgrad-ecommerce\\flipkart_com-ecommerce_sample.csv";
//
//
//
//        List<TestProduct> products = new CsvToBeanBuilder(new FileReader(path))
//                .withType(TestProduct.class)
//                .withFilter(new CsvToBeanFilter() {
//                    /*
//                     * This filter ignores empty lines from the input
//                     */
//                    @Override
//                    public boolean allowLine(String[] strings) {
//                        for (String one : strings) {
//                            if (one != null && one.length() > 0) {
//                                return true;
//                            }
//                        }
//                        return false;
//                    }
//                })
//                .withIgnoreLeadingWhiteSpace(true)
//                .build()
//                .parse();
//
//        log.info("Total Products" + products.size());
//
//        assertThat(products.size(),greaterThan(1));

    }
}
