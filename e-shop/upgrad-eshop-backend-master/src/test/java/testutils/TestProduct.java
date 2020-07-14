package testutils;

import com.opencsv.bean.CsvBindByName;

public class TestProduct {

    @CsvBindByName
    String uniq_id;
    @CsvBindByName
    String crawl_timestamp;
    @CsvBindByName
    String product_url;
    @CsvBindByName
    String product_name;
    @CsvBindByName
    String product_category_tree;

    @CsvBindByName
    String pid;
    @CsvBindByName
    String retail_price;
    @CsvBindByName
    String discounted_price;
    @CsvBindByName
    String image;
    @CsvBindByName
    String is_FK_Advantage_product;
    @CsvBindByName
    String description;
    @CsvBindByName
    String product_rating;
    @CsvBindByName
    String overall_rating;
    @CsvBindByName
    String brand;
    @CsvBindByName
    String product_specifications;
}
