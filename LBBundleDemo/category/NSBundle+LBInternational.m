//
//  NSBundle+LBInternational.m
//  LBBundleDemo
//
//  Created by JiBaoBao on 17/3/1.
//  Copyright © 2017年 JiBaoBao. All rights reserved.
//

#import "NSBundle+LBInternational.h"

@implementation NSBundle (LBInternational)

+ (instancetype)lb_refreshBundle{
    static NSBundle *refreshBundle = nil;
    if (refreshBundle == nil) {
        NSString *bundlePath = [[[NSBundle mainBundle] resourcePath] stringByAppendingString:@"/bundle2.bundle"];
        refreshBundle = [NSBundle bundleWithPath:bundlePath];
    }
    return refreshBundle;
}

+ (NSString *)lb_localizedStringForKey:(NSString *)key{
    return [self lb_localizedStringForKey:key value:nil];
}

+ (NSString *)lb_localizedStringForKey:(NSString *)key value:(NSString *)value{
    static NSBundle *bundle = nil;
    if (bundle == nil) {
        // （iOS获取的语言字符串比较不稳定）目前框架只处理en、zh-Hans、zh-Hant三种情况，其他按照系统默认处理
        NSString *language = [NSLocale preferredLanguages].firstObject;
        if ([language hasPrefix:@"en"]) {
            language = @"en";
        }else if ([language hasPrefix:@"zh"]) {
            if ([language rangeOfString:@"Hans"].location != NSNotFound) {
                language = @"zh-Hans"; // 简体中文
            }else { // zh-Hant\zh-HK\zh-TW
                language = @"zh-Hant"; // 繁體中文
            }
        }else {
            language = @"en";
        }
        
        // 从lbRefresh.bundle中查找资源
        bundle = [NSBundle bundleWithPath:[[NSBundle lb_refreshBundle] pathForResource:language ofType:@"lproj"]];
    }
    value = [bundle localizedStringForKey:key value:value table:nil];
    return [[NSBundle mainBundle] localizedStringForKey:key value:value table:nil];
}

@end
