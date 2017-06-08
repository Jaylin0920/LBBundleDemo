//
//  LBWebViewController.m
//  LBBundleDemo
//
//  Created by JiBaoBao on 17/3/1.
//  Copyright © 2017年 JiBaoBao. All rights reserved.
//

#import "LBWebViewController.h"

#define HEXCOLOR(c) [UIColor colorWithRed:((c>>24)&0xFF)/255.0 green:((c>>16)&0xFF)/255.0 blue:((c>>8)&0xFF)/255.0 alpha:((c)&0xFF)/255.0]

@interface LBWebViewController () <UIWebViewDelegate>
@property(nonatomic, strong)UIWebView *webView;
@end

@implementation LBWebViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.title = @"H5页面";
    [self.view addSubview:self.webView];
    [self loadUpHTML];
}

- (void)loadUpHTML{
    NSString * mainBundlePath = [[NSBundle mainBundle] resourcePath];
    NSString *basePath = [mainBundlePath stringByAppendingString:@"/bundle3.bundle"];
    NSString *htmlFilePath = [basePath stringByAppendingString:@"/createDream.html"];
    NSURL *baseURL = [NSURL fileURLWithPath:basePath isDirectory:YES];
    NSString *htmlStr = [NSString stringWithContentsOfFile:htmlFilePath encoding:NSUTF8StringEncoding error:nil];
    [self.webView loadHTMLString:htmlStr baseURL:baseURL];
}


#pragma mark - lazy load
- (UIWebView *)webView{
    if (_webView == nil) {
        _webView= [[UIWebView alloc]initWithFrame:self.view.bounds];
        _webView.backgroundColor = HEXCOLOR(0xf0f0f0ff);
        _webView.scrollView.backgroundColor = HEXCOLOR(0xf0f0f0ff);
        _webView.delegate = self;
        _webView.scalesPageToFit=NO;
    }
    return _webView;
}

@end
