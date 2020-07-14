package com.upgrad.eshop.product.search;

import com.upgrad.eshop.product.Product;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.query.QueryUtils;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

import static com.upgrad.eshop.utils.StringValidator.isNotEmptyOrNull;

@Repository
public class SearchRepositoryImpl implements SearchRepository {


    @Autowired
    EntityManager entityManager;


    private static final Logger log = LoggerFactory.getLogger(SearchRepositoryImpl.class);

    @Override
    public Page<Product> searchProduct(SearchRequest searchRequest) {

       Pageable pageable = searchRequest.asPageable();

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();

        CriteriaQuery<Product> query = getProductCriteriaQuery(searchRequest, pageable.getSort(), builder);

        int totalRows = getTotalRowsForCriteria(query);

        List<Product> resultList = getProductsForPage(pageable, query);

        return new PageImpl<>(resultList, pageable, totalRows);

    }

    CriteriaQuery<Product> getProductCriteriaQuery(SearchRequest searchRequest, Sort sortCriteria, CriteriaBuilder builder) {
        CriteriaQuery<Product> query = builder.createQuery(Product.class);


        Root<Product> product = query.from(Product.class);

        List<Predicate> predicates =  addPredicates(searchRequest, builder, product);

        query.where(predicates.toArray(new Predicate[0]));
        query.orderBy(QueryUtils.toOrders(sortCriteria, product, builder));
        return query;
    }

    List<Product> getProductsForPage(Pageable pageable, CriteriaQuery<Product> query) {
        TypedQuery<Product> typedQuery;

        typedQuery = entityManager.createQuery(query);
        typedQuery.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        typedQuery.setMaxResults(pageable.getPageSize());


        return typedQuery.getResultList();
    }

    int getTotalRowsForCriteria(CriteriaQuery<Product> query) {
        TypedQuery<Product> typedQuery = entityManager.createQuery(query);
        return typedQuery.getResultList().size();
    }


    private List<Predicate> addPredicates(SearchRequest searchRequest, CriteriaBuilder criteriaBuilder, Root<Product> productRoot) {
         List<Predicate> predicates = new ArrayList<>();

        if (isNotEmptyOrNull(searchRequest.getCategory())) {
            predicates.add(criteriaBuilder.equal(toLower(criteriaBuilder, productRoot, "category"), searchRequest.getCategory().toLowerCase()));
        }

        if (isNotEmptyOrNull(searchRequest.getName()))
            predicates.add(criteriaBuilder.like(toLower(criteriaBuilder, productRoot, "name"), "%" + searchRequest.getName().toLowerCase() + "%"));


        if (isNotEmptyOrNull(searchRequest.getOverAllRating()))
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(productRoot.get("overAllRating"), searchRequest.getOverAllRating()));

       predicates.add(criteriaBuilder.greaterThan(productRoot.get("availableItems"), 0));

        return predicates;
    }

    private Expression<String> toLower(CriteriaBuilder builder, Root<Product> product, String name) {
        return builder.lower(product.get(name));
    }


}
