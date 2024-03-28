<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\PurchaseItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    public function index(Request $request)
    {
        $user_id = $request->user()->id;
        $purchases = Purchase::where('user_id', $user_id)
            ->orderBy('created_at')
            ->get();


        $all_info = [];

        foreach ($purchases as $purchase) {
            $purchase_items = PurchaseItem::where('purchase_id', $purchase->id)
                ->get();
            
            $all_info[] = [
                'purchase' => $purchase,
                'products' => $purchase_items
            ];
        };

        return Inertia::render('Purchases/Index', [
            'purchases' => $all_info
        ]);
    }

    public function store(Request $request): Response
    {
        $all = $request->all()['purchaseItems'];
        $purchase = Purchase::create(['user_id' => $request->user()->id]);
        foreach ($all as $item) {
            PurchaseItem::create([
                'amount' => $item['amount'],
                'purchase_id' => $purchase->id,
                'product_id' => $item['item']['id'],
                'price_per_item' => $item['item']['price']
            ]);
        }
        return response('Successful purchased', 200);
    }
}
