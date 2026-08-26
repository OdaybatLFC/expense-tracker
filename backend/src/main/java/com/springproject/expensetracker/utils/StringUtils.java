package com.springproject.expensetracker.utils;

import lombok.experimental.UtilityClass;

import java.util.Locale;

@UtilityClass
public final class StringUtils {

    public static String normalizeSearch(String search) {
        if (!org.springframework.util.StringUtils.hasText(search)) {
            return null;
        }

        return search
                .trim()
                .replaceAll("\\s+", " ")
                .toLowerCase(Locale.ROOT);
    }

}
