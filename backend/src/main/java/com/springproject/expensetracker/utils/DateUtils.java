package com.springproject.expensetracker.utils;

import lombok.experimental.UtilityClass;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

@UtilityClass
public final class DateUtils {

    public static void validateDateRange(
            LocalDate from,
            LocalDate to
    ) {
        if (from != null && to != null && from.isAfter(to)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "'from' date must not be after 'to' date"
            );
        }
    }

}
