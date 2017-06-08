//
//  NSBundle+LBInternational.h
//  LBBundleDemo
//
//  Created by JiBaoBao on 17/3/1.
//  Copyright © 2017年 JiBaoBao. All rights reserved.
//

/*
 * 类注释：NSBundle_category 国际化类
 */
#import <Foundation/Foundation.h>

@interface NSBundle (LBInternational)

+ (instancetype)lb_refreshBundle;
+ (NSString *)lb_localizedStringForKey:(NSString *)key;
+ (NSString *)lb_localizedStringForKey:(NSString *)key value:(NSString *)value;

@end
